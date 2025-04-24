export class NotFoundParameterError extends Error {
    constructor(placeholderName: string) {
        super(`not found parameter with placeholder ${placeholderName}`)
    }
}