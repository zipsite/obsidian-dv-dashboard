import { NotFoundParameterError } from "@/Helpers/Replacers/Errors/NotFoundParameterError";
import JsPlaceholderReplacer from "@/Helpers/Replacers/JsPlaceholderReplacer";
import { expect, test } from "vitest";



test("Передача правильных параметров", () => {
    const replacer = new JsPlaceholderReplacer();

    expect(
        replacer.setString("Топики (${topicsCount})")
            .setParams({ topicsCount: 42 })
            .toString()
    ).toBe("Топики (42)")
})

test("Передача неправильных параметров", () => {
    const replacer = new JsPlaceholderReplacer();

    expect(
        () => replacer.setString("Топики (${topicsCount})")
            .toString()
    ).toThrow(new NotFoundParameterError("topicsCount"))
})