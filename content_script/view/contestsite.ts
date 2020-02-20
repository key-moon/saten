import MockSite from "./mocksite";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";
import SourceCode from "../model/sourcecode";

abstract class ContestSite {
  abstract siteName: string;
  onTestButtonClicked: (sourceCode: SourceCode) => void;

  abstract init(): void;

  abstract getTestCases(): TestCase[];

  abstract setTestResults(testResults: TestResult[]): void;

  static getCurrentContestSite(): ContestSite {
    return new MockSite();
  }
}

export default ContestSite;
