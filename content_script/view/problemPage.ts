import TestCase from "../model/testcase";
import TestResult from "../model/testresult";
import { SourceCode } from "../model/sourcecode";

abstract class ProblemPage {
    testResults: TestResult[];
    abstract siteName: string;
    onTestButtonClicked: (sourceCode: SourceCode) => void;

    abstract init(): void;

    abstract getTestCases(): TestCase[];

    abstract showTestResults(): void;

    abstract hideTestResults(): void;

    abstract updateTestResults(): void;

    setTestResults(testResults: TestResult[]): void {
        this.testResults = testResults;
        this.updateTestResults();
    }
}

export default ProblemPage;
