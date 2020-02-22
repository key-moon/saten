import {SourceCode} from "../../shared_model/sourcecode";
import DotnetAssembly from "../assemblies/dotnetAssembly";
import {binName, loadBlazor} from "../util/dotnetUtil";
import Language from "../../shared_model/language";
import {addCompiler} from "./compile";

let ceSplitter: string;

async function getCESplitter(): Promise<void>{
    if (ceSplitter) return;
    ceSplitter = await loadBlazor().then(() => DotNet.invokeMethod(binName, "GetCompileErrorSplitter"));
}

async function compileCSharp(sourceCode: SourceCode): Promise<DotnetAssembly> {
    if (sourceCode.language !== Language.CSharp) throw new Error(`Invalid language`);
    return new Promise((resolve, reject) => {
        getCESplitter().then(() => {
            console.log("compiling...");
            DotNet.invokeMethodAsync(binName, "Compile", sourceCode.source)
                .then(asm => {
                    console.log("successfully compiled.");
                    resolve(new DotnetAssembly(asm));
                })
                .catch(err => {
                    console.error(`compilation failed: \n${err}`);
                    const message = err.message.match(new RegExp(`${ceSplitter}(.*)${ceSplitter}`));
                    reject(message ? message[1].trim() : err.message);
                });
        });
    });
}

addCompiler(Language.CSharp, compileCSharp);
