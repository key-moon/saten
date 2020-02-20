export enum Language {
    Other,
    CPlusPlus,
    CSharp,
    Python3
}

export class SourceCode {
    constructor(language: Language, source: string) {
        this.language = language;
        this.source = source;
    }

    language: Language;
    source: string;
}
