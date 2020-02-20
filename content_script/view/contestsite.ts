import MockSite from "./mocksite";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";

abstract class ContestSite {
  abstract siteName: string;

  abstract getTestCases(): TestCase[];

  abstract setTestResults(testResults: TestResult[]): void;

  static getCurrentContestSite(): ContestSite {
    return new MockSite();
  }
}

export default ContestSite;
