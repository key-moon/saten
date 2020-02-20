import ContestSite from "./view/contestsite";

const contestSite: ContestSite = ContestSite.getCurrentContestSite();

contestSite.init();

contestSite.onTestButtonClicked = sourceCode => {
    return;
};
