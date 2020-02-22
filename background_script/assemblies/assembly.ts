import RunResult from "../../shared_model/runresult";
import TestCase from "../../shared_model/testcase";

abstract class Assembly{
    abstract async run(testCase: TestCase): Promise<RunResult>;
}

export default Assembly;
