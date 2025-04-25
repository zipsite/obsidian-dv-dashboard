export class GetDontExistConfigError extends Error {
    constructor(configName: string) {
        super(`parameter ${configName} dont exist in config hahah`);
    }
}