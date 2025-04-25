export class InvalidLangError extends Error {
    constructor(lang: string) {
        super(`${lang} is invalid lang`);
    }
}