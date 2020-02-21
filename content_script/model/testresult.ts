import TestCase from "../../shared_model/testcase";
import Status from "./status";

export default class TestResult {
    testCase: TestCase;
    status: Status = Status.WJ;
    output: string;
    trace: string;
    elapsedTime: number;
}
