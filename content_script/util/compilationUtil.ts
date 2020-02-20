import { SourceCode } from "../model/sourcecode";
import { sendMessage } from "./messagePassingUtil";

class RunResult {
    elapsedTime: number;
    output: string;
    trace: string;
}

export default class Assembly {
    id: number;
    async run(input: string): Promise<RunResult> {
        return (await sendMessage("run", { id: this.id, input: input })) as RunResult;
    }

    static async Compile(sourceCode: SourceCode): Promise<Assembly> {
        return (await sendMessage("compile", sourceCode)) as Assembly;
    }
}
