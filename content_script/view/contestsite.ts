import MockSite from "./mocksite";
import TestCase from "../model/testcase";

abstract class ContestSite {
  abstract siteName: string;

  abstract getTestCases(): TestCase[];

  static getCurrentContestSite(): ContestSite {
    return new MockSite();
  }
}

export default ContestSite;
