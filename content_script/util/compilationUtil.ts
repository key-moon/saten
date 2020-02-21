import { SourceCode } from "../model/sourcecode";
import { sendMessage } from "./messagePassingUtil";

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
    async run(input: string): Promise<RunResult> {
        return new RunResult(await sendMessage("run", { id: this.id, input: input }));
    }
    static async Compile(sourceCode: SourceCode): Promise<Assembly> {
        return new Assembly(await sendMessage("compile", sourceCode));
    }
}
