import ProblemPage from "./view/problemPage";

const contestSite: ProblemPage = ProblemPage.getCurrentContestSite();

contestSite.init();

contestSite.onTestButtonClicked = sourceCode => {
    return;
};
