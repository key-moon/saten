import MockPage from "./mockPage";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";
import { SourceCode } from "../model/sourcecode";
import AtCoderProblemPage from "./atcoderProblemPage";

abstract class ProblemPage {
    abstract siteName: string;
    onTestButtonClicked: (sourceCode: SourceCode) => void;

    abstract init(): void;

    abstract getTestCases(): TestCase[];

    abstract setTestResults(testResults: TestResult[]): void;

    static getCurrentContestSite(): ProblemPage {
        const atcoderRegex = /^https?:\/\/atcoder\.jp\/contests\/.*\/tasks\/.*$/;
        if (atcoderRegex.test(document.location.href)) return new AtCoderProblemPage();
        return undefined;
    }
}

export default ProblemPage;
