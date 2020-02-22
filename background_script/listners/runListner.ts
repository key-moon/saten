import { assemblies } from "./compileListner";
import TestCase from "../../shared_model/testcase";

export async function runListener(assembly: { id: number; testCase: TestCase }): Promise<void> {
    assemblies[assembly.id].run(assembly.testCase);
}
