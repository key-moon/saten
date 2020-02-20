import ContestPage from "./problemPage";
import TestCase from "../model/testcase";
import TestResult from "../model/testresult";
import {Language, SourceCode} from "../model/sourcecode";

let languageDict: { [index:number]: Language; } =
{
    3003: Language.CPlusPlus,//C++14 GCC
    3005: Language.CPlusPlus,//C++14 Clang
    3029: Language.CPlusPlus,//GCC
    3030: Language.CPlusPlus,//Clang
    3006: Language.CSharp,
    3023: Language.Python3,//Python3
    3510: Language.Python3,//PyPy

    //updated
    4003: Language.CPlusPlus,//GCC
    4004: Language.CPlusPlus,//Clang
    4010: Language.CSharp,//.NET Core
    4011: Language.CSharp,//Mono-mcs
    4012: Language.CSharp,//Mono-csc
    4006: Language.Python3,//Python3
    4047: Language.Python3//PyPy3
};

export default class AtCoderProblemPage extends ContestPage {
    siteName = "atcoder";

    init(): void {
        let resultTable =
`<table class="table table-bordered table-striped th-center hide" id="sample-test-result-table">
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
        let testButton =
`<button type="button" id="sample-test-button" class="btn btn-info" style="margin-left: 5px">Test sample cases</button>`;
        let submitForm = document.querySelector('#main-container form');
        let buttonGroup = submitForm.lastElementChild.getElementsByTagName("div")[0];
        submitForm.after(resultTable);
        buttonGroup.lastElementChild.after(testButton);

        document.getElementById("sample-test-button").onclick = () => {
            let langSelector =
                <HTMLInputElement>document.querySelector("select[name='data.LanguageId']");
            let sourceTextArea =
                <HTMLInputElement>submitForm.querySelector('.plain-textarea');
            let languageID = langSelector.value;
            let source = sourceTextArea.value;
            let language = languageDict[languageID] || Language.Other;
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
