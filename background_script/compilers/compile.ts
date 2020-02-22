import {SourceCode} from "../../shared_model/sourcecode";
import Language from "../../shared_model/language";
import Assembly from "../assemblies/assembly";

type CompilersRecord = Record<Language, (sourceCode: SourceCode) => Promise<Assembly>>;

const compilers: CompilersRecord = {} as CompilersRecord;

export default async function compile(source: SourceCode): Promise<Assembly> {
    return compilers[source.language](source);
}
