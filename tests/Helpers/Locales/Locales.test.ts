import { NotFoundLocaleError } from "@/Helpers/Locales/Errors/NotFoundLocaleError";
import { Locales } from "@/Helpers/Locales/Locales";
import { expect, test } from "vitest";

test("Получение существующей локали", () => {
    const locale = new Locales();

    expect(locale.getLocale("headerTopicContent"))
        .toBe("Содержание")
})

test("Получение несуществующей локали", () => {
    const locale = new Locales();

    const key = "hakgphaiuhfb"

    expect(() => locale.getLocale(key))
        .toThrow(new NotFoundLocaleError(key))
})