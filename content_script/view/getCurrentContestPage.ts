import ProblemPage from "./problemPage";
import AtCoderProblemPage from "./atcoderProblemPage";

export default function getCurrentContestPage(): ProblemPage {
    const atcoderRegex = /^https?:\/\/atcoder\.jp\/contests\/.*\/tasks\/.*$/;
    if (atcoderRegex.test(document.location.href)) return new AtCoderProblemPage();
    return undefined;
}
