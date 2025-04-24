import { Config } from "@/Helpers/Config";
import { GetDontExistConfigError } from "@/Helpers/Errors/GetDontExistConfigError";
import { expect, test } from "vitest"


test("Получение существующего поля", () => {
    const config = new Config();
    expect(config.get("localesLang")).toBe("ru_RU")
})

test("Получение несуществуюего поля", () => {
    const config = new Config();
    const configName = "auhfoghnogco";
    expect(() => config.get(configName))
        .toThrowError(new GetDontExistConfigError(configName))
})
