import ProblemPage from "./view/problemPage";

const contestSite: ProblemPage = ProblemPage.getCurrentContestSite();

if (typeof contestSite !== "undefined") {
    contestSite.init();

    contestSite.onTestButtonClicked = sourceCode => {
        return;
    };
}
