import { sendMessage } from "./messagePassingUtil";
import { SourceCode } from "../../shared_model/sourcecode";
import TestCase from "../../shared_model/testcase";

class RunResult {
    constructor(initializers: { elapsedTime: number; output: string; trace: string }) {
        this.elapsedTime = initializers.elapsedTime;
        this.output = initializers.output;
        this.trace = initializers.trace;
    }
    elapsedTime: number;
    output: string;
    trace: string;
}

export default class Assembly {
    constructor(initializers: { id: number }) {
        this.id = initializers.id;
    }
    id: number;
    async run(testCase: TestCase): Promise<RunResult> {
        const result = await sendMessage("run", { id: this.id, testCase: testCase });
        return new RunResult(result as RunResult);
    }
    static async Compile(sourceCode: SourceCode): Promise<Assembly> {
        const result = await sendMessage("compile", sourceCode);
        return new Assembly(result as Assembly);
    }
}
