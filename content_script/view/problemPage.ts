import MockPage from "./mockPage";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";
import {SourceCode} from "../model/sourcecode";

abstract class ProblemPage {
    abstract siteName: string;
    onTestButtonClicked: (sourceCode: SourceCode) => void;

    abstract init(): void;

    abstract getTestCases(): TestCase[];

    abstract setTestResults(testResults: TestResult[]): void;

    static getCurrentContestSite(): ProblemPage {
        return new MockPage();
    }
}

export default ProblemPage;
