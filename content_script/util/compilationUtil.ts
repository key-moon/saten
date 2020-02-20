import { SourceCode } from "../model/sourcecode";
import { sendMessage } from "./messagePassingUtil";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";

class RunResult{
    elapsedTime: number;
    output: string;
    trace: string;
}

export class Assembly {
    id: number;
    async run(input: string): Promise<RunResult> {
        return (await sendMessage("run", { id: this.id, input: input })) as RunResult;
    }

    static async Compile(sourceCode: SourceCode): Promise<Assembly> {
        return (await sendMessage("compile", sourceCode)) as Assembly;
    }
}
