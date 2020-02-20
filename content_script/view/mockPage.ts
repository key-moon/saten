import ProblemPage from "./problemPage";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";

export default class MockPage extends ProblemPage {
    siteName = "mock";

    init(): void {
        return;
    }

    getTestCases(): TestCase[] {
        return [];
    }

    setTestResults(testResults: TestResult[]): void {
        return;
    }
}
