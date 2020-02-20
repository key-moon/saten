import ContestPage from "./problemPage";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";
import { Language, SourceCode } from "../model/sourcecode";

const languageDict: { [index: number]: Language } = {
    3003: Language.CPlusPlus, //C++14 GCC
    3005: Language.CPlusPlus, //C++14 Clang
    3029: Language.CPlusPlus, //GCC
    3030: Language.CPlusPlus, //Clang
    3006: Language.CSharp,
    3023: Language.Python3, //Python3
    3510: Language.Python3, //PyPy

    //updated
    4003: Language.CPlusPlus, //GCC
    4004: Language.CPlusPlus, //Clang
    4010: Language.CSharp, //.NET Core
    4011: Language.CSharp, //Mono-mcs
    4012: Language.CSharp, //Mono-csc
    4006: Language.Python3, //Python3
    4047: Language.Python3 //PyPy3
};

const resultTable = `<table class="table table-bordered table-striped th-center hide" id="sample-test-result-table">
    <thead>
        <tr>
            <th/>
            <th>Sample</th>
            <th>Status</th>
            <th>Exec Time</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>`;

const testButton = `<button type="button" id="sample-test-button" class="btn btn-info" style="margin-left: 5px">
    Test sample cases
</button>`;

export default class AtCoderProblemPage extends ContestPage {
    siteName = "atcoder";

    init(): void {
        const submitForm = document.querySelector("#main-container form");
        const buttonGroup = submitForm.lastElementChild.getElementsByTagName("div")[0];
        submitForm.after(resultTable);
        buttonGroup.lastElementChild.after(testButton);

        document.getElementById("sample-test-button").onclick = () => {
            const langSelector = document.querySelector("select[name='data.LanguageId']") as HTMLInputElement;
            const sourceTextArea = submitForm.querySelector(".plain-textarea") as HTMLInputElement;
            const languageID = langSelector.value;
            const source = sourceTextArea.value;
            const language = languageDict[languageID] || Language.Other;
            this.onTestButtonClicked(new SourceCode(language, source));
        };
    }

    getTestCases(): TestCase[] {
        return [];
    }

    setTestResults(testResults: TestResult[]): void {
        return;
    }
}