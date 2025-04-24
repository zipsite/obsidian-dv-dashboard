export type Langs = "ru_RU";

export type Locales = {
    [key: string]: string;
}

export type LocaleByLang = {
    [key in Langs]: Locales;
};

