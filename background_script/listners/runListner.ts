import { assemblies } from "./compileListner";
import TestCase from "../../shared_model/testcase";
import RunResult from "../../shared_model/runresult";

export async function runListener(assembly: { id: number; testCase: TestCase }): Promise<RunResult> {
    return assemblies[assembly.id].run(assembly.testCase);
}
