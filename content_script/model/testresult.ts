import TestCase from "./testcase";

enum Status {
  WJ,
  AC,
  WA,
  RE,
  TLE,
  MLE,
  CE
}

export default class TestResult {
  testCase: TestCase;
  status: Status;
  output: string;
  trace: string;
  elapsedTime: number;
}
