import ProblemPage from "./view/problemPage";
import Assembly from "./util/compilationUtil";
import TestResult from "./model/testresult";
import { validate } from "./util/validator";

const contestSite: ProblemPage = ProblemPage.getCurrentContestSite();

if (typeof contestSite !== "undefined") {
    contestSite.init();

    contestSite.onTestButtonClicked = async sourceCode => {
        const testCases = contestSite.getTestCases();
        const results: TestResult[] = testCases.map(testCase => {
            const result = new TestResult();
            result.testCase = testCase;
            return result;
        });
        contestSite.showTestResults();
        contestSite.setTestResults(results);
        //TODO:コンパイル中/コンパイルエラーを表示する
        const assembly = await Assembly.Compile(sourceCode);
        for (let i = 0; i < testCases.length; i++) {
            const res = await assembly.run(testCases[i].input);
            results[i].elapsedTime = res.elapsedTime;
            results[i].output = res.output;
            results[i].trace = res.trace;
            results[i].status = validate(results[i].testCase.output, results[i].output);
            contestSite.updateTestResults();
        }
    };
}
