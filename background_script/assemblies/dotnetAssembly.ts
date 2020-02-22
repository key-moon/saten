import './DotnetConsole'
import '@microsoft/dotnet-js-interop';
import RunResult from "../../shared_model/runresult";
import Assembly from "./assembly";
import {binName} from "../util/dotnetUtil";

const reSplitter = DotNet.invokeMethod(binName, "GetRuntimeErrorSplitter");

const timeLimit = 2000;

let _lock = false;

export default class DotnetAssembly extends Assembly {
    _dotnetAsmRef;
    constructor(dotNetAssemblyReference) {
        super();
        this._dotnetAsmRef = dotNetAssemblyReference;
    }

    async run(testCase) {
        return new Promise<RunResult>((resolve, reject) => {
            if (_lock) reject("locked");
            _lock = true;

            console.log("executing...");
            DotnetConsole.discardBuffer();
            DotnetConsole.setInput(testCase.input);
            DotNet.invokeMethodAsync(binName, "Run", this._dotnetAsmRef, timeLimit)
                .then((res: RunResult) => {
                    _lock = false;
                    res.output = DotnetConsole.getOutput();
                    console.log(`successfully executed. \noutput :\n${res.output}`);
                    resolve(res);
                })
                .catch(err => {
                    _lock = false;
                    console.error(`execution failed: \n${err}`);
                    const errorSplitter = "at \\(wrapper managed-to-native\\)";
                    const regex = new RegExp(`${reSplitter}(.*)${errorSplitter}.*${reSplitter}`, 'm');
                    const match = err.message.match(regex);
                    reject(match ? match[1] : err.message);
                });
        });
    }
}