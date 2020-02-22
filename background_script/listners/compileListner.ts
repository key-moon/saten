import { SourceCode } from "../../shared_model/sourcecode";
import { compile } from "../compilers/compile";
import Assembly from "../assemblies/assembly";

export const assemblies: Assembly[] = [];

export async function compileListener(sourceCode: SourceCode): Promise<{ id: number }> {
    const assembly = await compile(sourceCode);
    assemblies.push(assembly);
    return { id: assemblies.length - 1 };
}
