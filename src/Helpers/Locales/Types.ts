export type Langs = "ru_RU";

export type LocalesList = {
    [key: string]: string;
}

export type LocaleByLang = {
    [key in Langs]: LocalesList;
};

