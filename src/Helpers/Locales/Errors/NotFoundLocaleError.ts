export class NotFoundLocaleError extends Error {
    constructor(key: string) {
        super(`not found locale for ${key} key`)
    }
}