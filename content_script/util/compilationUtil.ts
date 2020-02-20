import { SourceCode } from "../model/sourcecode";
import { sendMessage } from "./messagePassingUtil";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";

export class Assembly {
    id: number;
    async run(testCase: TestCase): Promise<TestResult> {
        return (await sendMessage("run", { id: this.id, testCase: testCase })) as TestResult;
    }

    static async Compile(sourceCode: SourceCode): Promise<Assembly> {
        return (await sendMessage("compile", sourceCode)) as Assembly;
    }
}
