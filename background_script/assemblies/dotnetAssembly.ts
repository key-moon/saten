import RunResult from "../../shared_model/runresult";
import Assembly from "./assembly";
import { binName, loadBlazor } from "../util/dotnetUtil";

let reSplitter: string;

async function getRESplitter(): Promise<void> {
    if (reSplitter) return;
    reSplitter = await loadBlazor().then(() => DotNet.invokeMethod(binName, "GetRuntimeErrorSplitter"));
}

let lastPromise = loadBlazor().then(getRESplitter);

const timeLimit = 2000;

export default class DotnetAssembly extends Assembly {
    _dotnetAsmRef;
    constructor(dotNetAssemblyReference) {
        super();
        this._dotnetAsmRef = dotNetAssemblyReference;
    }

    async run(testCase): Promise<RunResult> {
        return new Promise<RunResult>((resolve, reject) => {
            lastPromise = lastPromise.then(async () => {
                console.log("executing...");
                DotnetConsole.discardBuffer();
                DotnetConsole.setInput(testCase.input);
                try {
                    const promise = DotNet.invokeMethodAsync(binName, "Run", this._dotnetAsmRef, timeLimit);
                    const res = (await promise) as RunResult;
                    res.output = DotnetConsole.getOutput();
                    console.log(`successfully executed. \noutput :\n${res.output}`);
                    resolve(res);
                } catch (err) {
                    console.error(`execution failed: \n${err}`);
                    const errorSplitter = "at \\(wrapper managed-to-native\\)";
                    const regex = new RegExp(`${reSplitter}(.*)${errorSplitter}.*${reSplitter}`, "m");
                    const match = err.message.match(regex);
                    reject(match ? match[1] : err.message);
                }
            });
        });
    }
}
