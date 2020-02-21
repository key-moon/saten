import Language from "./language";

export class SourceCode {
    constructor(language: Language, source: string) {
        this.language = language;
        this.source = source;
    }

    language: Language;
    source: string;
}
