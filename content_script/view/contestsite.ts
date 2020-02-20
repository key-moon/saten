import MockSite from "./mocksite";

abstract class ContestSite {
  abstract siteName: string;

  static getCurrentContestSite(): ContestSite {
    return new MockSite();
  }
}

export default ContestSite;
