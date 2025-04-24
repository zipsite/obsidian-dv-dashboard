import { Locale } from "@/Helpers/Locale"
import { Content } from "@/Links/Content"
import { ObsidianURLGenerator } from "@/Links/URLGenerators/ObsidianURLGenerator"
import { BaseURLGenerator } from "@/Links/URLGenerators/BaseURLGenerator"
import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil"
import { Folders } from "@/Helpers/Folders"
import { DvPage } from "@/Helpers/ReadUtil/Types"




/**
 * Базовый класс, для создания создающих ссылок
 */
export abstract class BaseLinkNewCreator {

	protected content: Content;
	protected locale: Locale;
	protected obsidianURL: ObsidianURLGenerator;
	protected urlGenerator: BaseURLGenerator;
	protected topicReadUtil: TopicReadUtil;
	protected saveFolders: Folders;

	constructor() {
		this.content = new Content();
		this.locale = new Locale()
		this.obsidianURL = new ObsidianURLGenerator();
		this.urlGenerator = new BaseURLGenerator();
		this.topicReadUtil = new TopicReadUtil();
		this.saveFolders = new Folders(this.topicReadUtil);
	}

	/**
	* Устанавливает страницу
	* @param {DvPage} page 
	* @returns {BaseLinkNewCreator}
	*/
	setPage(page: DvPage): BaseLinkNewCreator {
		this.topicReadUtil.setPage(page);
		return this;
	}

	setTopicReadUtil(util: TopicReadUtil): BaseLinkNewCreator {
		this.topicReadUtil = util;
		return this;
	}

	/**
	 * Возвращает блок с отношением
	 * @param {string} locale
	 * @returns {string}
	 */
	protected genRelationBlock(locale: string): string {
		const localeRelatedTopicInfo = this.locale
			.getLocale(locale, {
				topicLink: this.genInnerLink()
			})
		return `> ${localeRelatedTopicInfo}`
	}

	/**
	 * Генерирует внутреннюю ссылку
	 * @returns {string}
	 */
	protected genInnerLink(): string {

		const mainTopicFile = this.topicReadUtil.getFile();
		const config = app.vault.config;

		if (config.useMarkdownLinks) {
			const pathEncoded = this.urlGenerator
				.setPath(mainTopicFile.path)
				.genUrl();

			return `[${mainTopicFile.name}](${pathEncoded})`;
		} else {
			return `[[${mainTopicFile.path}|${mainTopicFile.name}]]`;
		}
	}

	/**
	 * Возвращает ссылку для создания новой страницы
	 * @returns {string}
	 */
	getLink(): string {
		return this.handler();
	}

	/**
	 * Хандлер, возвращающий ссылку внутри класса
	 * @returns {string}
	 */
	protected abstract handler(): string
}
