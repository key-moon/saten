import ContestSite from "./contestsite";
import TestCase from "../model/testcase";

export default class MockSite extends ContestSite {
  siteName = "mock";

  getTestCases(): TestCase[] {
    return [];
  }
}
