import { Config } from "@/Helpers/Config";
import { LocaleByLang, Langs, LocalesList } from "./Types";
import { NotFoundParameterError } from "../Replacers/Errors/NotFoundParameterError";
import { NotFoundLocaleError } from "./Errors/NotFoundLocaleError";
import { InvalidLangError } from "./Errors/InvalidLangError";
import JsPlaceholderReplacer from "../Replacers/JsPlaceholderReplacer";

/**
 * Управление и получение локалей
 */
export class Locales {

	private allLangLocales: LocaleByLang = {
		"ru_RU": {
			headerTopicContent: "Содержание",
			headerDescriptionPage: "# Описание",
			headerTopicList: "Топики (${topicsCount})",
			headerArticleList: "Статьи (${articlesCount})",
			elemArticleList: "${articleLink} *(Изм. ${modifiedDate})*",
			createNewTopic: "[ + Создать новый топик](${newTopicLink})",
			createNewArticle: "[ + Создать новую статью](${newArticleLink})",
			newTopicName: "Новый топик",
			newArticleName: "Новая статья",
			relatedTopicInfo: "**Этот топик часть топика** *${topicLink}*\n",
			relatedArticleInfo: "**Эта статья часть топика** *${topicLink}*\n",
		}
	}

	private lang: Langs
	private replacer: JsPlaceholderReplacer

	constructor() {
		this.lang = (new Config).get("localesLang") ?? "";
		this.replacer = new JsPlaceholderReplacer();
	}

	/**
	 * Возвращает локали определённого языка
	 * @returns {Locales}
	 */
	private getCertainLangLocales(): LocalesList {
		if (!this.allLangLocales.hasOwnProperty(this.lang)) {
			throw new InvalidLangError(this.lang);
		}
		return this.allLangLocales[this.lang];
	}

	/**
	 * Возвращает определённую локаль
	 * @param {string} key 
	 * @returns 
	 */
	private getCertainLocale(key: string) {
		const certainLangLocale = this.getCertainLangLocales();

		if (!certainLangLocale.hasOwnProperty(key)) {
			throw new NotFoundLocaleError(key)
		}

		return certainLangLocale[key];
	}

	/**
	 * вставляет парамерты в локаль и возвращает её
	 * @param {string} key 
	 * @param {Record<string, string>} params 
	 * @returns 
	 */
	getLocale(key: string, params: Record<string, string | number> = {}) {

		const certainLocale = this.getCertainLocale(key);

		return this.replacer
			.setString(certainLocale)
			.setParams(params)
			.toString()
	}
}
