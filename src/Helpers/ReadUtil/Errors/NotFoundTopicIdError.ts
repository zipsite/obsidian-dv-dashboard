export class NotFoundTopicIdError extends Error {
    constructor(path: string) {
        super(`topicId not foud for page ${path}`)
    }
}