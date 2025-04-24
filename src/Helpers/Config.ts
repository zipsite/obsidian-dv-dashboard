// Различного рода конфигурации
//====================================================================//

export class Config {

    config: Record<string, string> = {
        localesLang: "ru_RU",
        scriptPath: "99-Техническая/scripts/dashboard/dist/topic",
    }


    get(configName: string): any {
        if (!this.config.hasOwnProperty(configName)) {
            throw new Error(`parameter ${configName} dont exist in config`)
        }
        return this.config[configName];
    }
}
