import { Config } from "@/Helpers/Config";
import { LocaleByLang, Langs, Locales } from "./Types/Locales";

/**
 * Управление и получение локалей
 */
export class Locale {

	private allLocales: LocaleByLang = {
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

	constructor() {
		this.lang = (new Config).get("localesLang") ?? "";
	}

	/**
	 * Возвращает локали определённого языка
	 * @returns {Locale}
	 */
	private getCertainLangLocales(): Locales {
		if (!this.allLocales.hasOwnProperty(this.lang)) {
			throw new Error("invalid lang locale, please see /Config");
		}
		return this.allLocales[this.lang];
	}

	/**
	 * Возвращает определённую локаль
	 * @param {string} key 
	 * @returns 
	 */
	private getCertainLocale(key: string) {
		const certainLangLocale = this.getCertainLangLocales();

		if (!certainLangLocale.hasOwnProperty(key)) {
			throw new Error(`not found locale for ${key} key`)
		}

		return certainLangLocale[key];
	}

	/**
	 * вставляет парамерты в локаль и возвращает её
	 * @param {string} key 
	 * @param {Record<string, string>} params 
	 * @returns 
	 */
	getLocale(key: string, params: Record<string, any> = {}) {

		const certainLocale = this.getCertainLocale(key);

		return certainLocale.replace(/\$\{([a-zA-Z_$][0-9a-zA-Z_$]*)\}/g, (_, placeholderName: string) => {
			if (!params.hasOwnProperty(placeholderName)) {
				throw new Error(`not found parameter with placeholder ${placeholderName}`);
			}
			return params[placeholderName];
		});
	}
}
