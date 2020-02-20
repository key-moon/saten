import ContestSite from "./contestsite";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";

export default class MockSite extends ContestSite {
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
