import {SourceCode} from "../../shared_model/sourcecode";
import Language from "../../shared_model/language";
import Assembly from "../assemblies/assembly";

type Compiler = (sourceCode: SourceCode) => Promise<Assembly>;
type CompilersRecord = Record<Language, Compiler>;

const compilers: CompilersRecord = {} as CompilersRecord;

export function addCompiler(language: Language, compiler: Compiler) {
    compilers[language] = compiler;
}

export async function compile(source: SourceCode): Promise<Assembly> {
    return compilers[source.language](source);
}
