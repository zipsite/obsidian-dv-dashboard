// Различного рода конфигурации
//====================================================================//

import { GetDontExistConfigError } from "./Errors/GetDontExistConfigError";

export class Config {

    private config: Record<string, string> = {
        localesLang: "ru_RU",
        scriptPath: "99-Техническая/scripts/dashboard/dist/topic",
    }


    get(configName: string): any {
        if (!this.config.hasOwnProperty(configName)) {
            throw new GetDontExistConfigError(configName)
        }
        return this.config[configName];
    }
}
