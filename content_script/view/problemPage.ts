import TestResult from "../model/testresult";
import { SourceCode } from "../../shared_model/sourcecode";
import TestCase from "../../shared_model/testcase";

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
