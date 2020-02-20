import TestCase from "./testcase";
import Status from "./status";

export default class TestResult {
    testCase: TestCase;
    status: Status;
    output: string;
    trace: string;
    elapsedTime: number;
}
