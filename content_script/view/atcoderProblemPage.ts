import ProblemPage from "./problemPage";
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

const rules = [
    `#sample-test-result-table textarea {
    resize: none;
}`,
    `.sample-test-result-half-div {
    display: inline-block;
    width: 50%;
    padding: 5px;
}`,
    `.detail{
    font-size: 0;
}`
];

const resultTable = `<table class="table table-bordered table-striped th-center hide" id="sample-test-result-table">
    <thead>
        <tr>
            <th width="5%"/>
            <th width="25%">Sample</th>
            <th width="30%">Status</th>
            <th>Exec Time</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>`;

const testButton = `<button type="button" id="sample-test-button" class="btn btn-info" style="margin-left: 5px">
    Test sample cases
</button>`;

function getTestResultElem(index: number, result: TestResult): string {
    const status = result.status.toString();
    const labelPrefix = status === "WJ" ? "default" : status === "AC" ? "success" : "warning";
    let statusElem = `<span class="label label-${labelPrefix}">${status}</span>`;
    if (statusElem === "WJ") statusElem += '<img src="//img.atcoder.jp/assets/icon/waiting.gif" alt="…">';
    return `<tr>
    <td class="text-center expand">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="glyphicon glyphicon-chevron-down hide" aria-hidden="true"></span>
    </td>
    <td class="text-center">
        #${index + 1}
    </td>
    <td class="text-center">
        ${statusElem}
    </td>
    <td class="text-center">
        ${result.elapsedTime ? `${result.elapsedTime} ms` : "-"}
    </td>
</tr>
<tr/>
<tr class="detail hide">
    <td colspan="4">
        <div>
            <div class="sample-test-result-half-div" style="border-right: solid 1px grey">
                <section>
                    <h5>sample input</h5>
                    <textarea rows="3" readonly class="form-control">${result.testCase.input || ""}</textarea>
                </section>
                <section>
                    <h5>sample output</h5>
                    <textarea rows="3" readonly class="form-control">${result.testCase.output || ""}</textarea>
                </section>
            </div>    
            <div class="sample-test-result-half-div" style="border-left: solid 1px grey">
                <section>
                    <h5>your error output</h5>
                    <textarea rows="3" readonly class="form-control">${result.trace || ""}</textarea>
                </section>
                <section>
                    <h5>your output</h5>
                    <textarea rows="3" readonly class="form-control">${result.output || ""}</textarea>
                </section>
            </div>
        </div>
    </td>
</tr>`;
}

export default class AtCoderProblemPage extends ProblemPage {
    siteName = "atcoder";

    init(): void {
        const submitForm = document.querySelector("#main-container form");
        const buttonGroup = submitForm.lastElementChild.getElementsByTagName("div")[0];
        submitForm.insertAdjacentHTML("afterend", resultTable);
        buttonGroup.insertAdjacentHTML("beforeend" ,testButton);

        const style = document.createElement("style");
        document.head.appendChild(style);
        const sheet = style.sheet as CSSStyleSheet;
        rules.forEach(rule => {
            sheet.insertRule(rule, sheet.rules.length);
        });

        document.getElementById("sample-test-button").onclick = (): void => {
            const langSelector = document.querySelector("select[name='data.LanguageId']") as HTMLInputElement;
            const sourceTextArea = submitForm.querySelector(".plain-textarea") as HTMLInputElement;
            const languageID = langSelector.value;
            const source = sourceTextArea.value;
            const language = languageDict[languageID] || Language.Other;
            this.onTestButtonClicked(new SourceCode(language, source));
        };
    }

    getTestCases(): TestCase[] {
        const h3Elem = document.querySelectorAll("h3");

        const inputs = [];
        const outputs = [];

        h3Elem.forEach(elem => {
            const textContent = elem.textContent;
            let targetArrays: string[];

            if (textContent.includes("入力例")) {
                targetArrays = inputs;
            } else if (textContent.includes("出力例")) {
                targetArrays = outputs;
            } else {
                return;
            }

            let element: Element;
            if (elem.tagName === "PRE") {
                element = elem;
            } else if (elem.tagName === "DIV") {
                element = elem.nextElementSibling;
            } else if (elem.children.length >= 3) {
                element = elem.children[2];
            } else {
                element = elem.children[0];
            }
            targetArrays.push(element.textContent);
        });

        const res = [];
        for (let i = 0; i < inputs.length && i < outputs.length; i++) {
            res.push(new TestCase(inputs[i], outputs[i]));
        }
        return res;
    }

    getTestResultsTable(): HTMLElement {
        return document.querySelector("#sample-test-result-table");
    }

    hideTestResults(): void {
        this.getTestResultsTable().classList.add("hide");
    }

    showTestResults(): void {
        this.getTestResultsTable().classList.remove("hide");
    }

    updateTestResults(): void {
        const sampleTestTable = this.getTestResultsTable().querySelector("tbody");
        sampleTestTable.innerHTML = "";
        for (let i = 0; i < this.testResults.length; i++) {
            const result = this.testResults[i];
            const elemHTML = getTestResultElem(i, result);
            sampleTestTable.insertAdjacentHTML("beforeend", elemHTML);
            const expandButtons = sampleTestTable.querySelectorAll(".expand");
            const detailRows = sampleTestTable.querySelectorAll(".detail");
            const expandButton = expandButtons[expandButtons.length - 1];
            const detailRow = detailRows[detailRows.length - 1];
            expandButton.addEventListener("click", () => {
                expandButton.querySelector(".glyphicon-chevron-right").classList.toggle("hide");
                expandButton.querySelector(".glyphicon-chevron-down").classList.toggle("hide");
                detailRow.classList.toggle("hide");
            });
        }
    }
}
