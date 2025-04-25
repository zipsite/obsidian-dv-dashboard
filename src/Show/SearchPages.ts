// поиск и сортировка элементов
//====================================================================//

import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil";
import { DvPage } from "@/Helpers/ReadUtil/Types";

export class SearchPages {

	topicReadUtil: TopicReadUtil

	constructor() {
		this.topicReadUtil = new TopicReadUtil();
	}

	/**
	 * Задаём страницу
	 * @param {DvPage} page
	 * @returns {SearchPages} 
	 */
	setPage(page: DvPage): SearchPages {
		this.topicReadUtil.setPage(page)
		return this;
	}

	setTopicReadUtil(topicReadUtil: TopicReadUtil) {
		this.topicReadUtil = topicReadUtil
		return this;
	}

	/**
	 * Получаем страницы типа статья
	 * @returns {Array<DvPage>}
	 */
	getArticles(): Array<DvPage> {
		return this.getTypedPage("article");
	}

	/**
	 * Получаем страницы типа топик
	 * @returns {Array<DvPage>}
	 */
	getTopics(): Array<DvPage> {
		return this.getTypedPage("topic");
	}

	/**
	 * Получаем страницы определённого типа
	 * @param {string} type 
	 * @returns {Array<DvPage>}
	 */
	private getTypedPage(type: string): Array<DvPage> {
		const pageInlinks = this.topicReadUtil.getFile().inlinks;
		let searchPages: Array<DvPage> = [];

		for(const inlink of pageInlinks) {
			const currentPage = dv.page(inlink.path);
			const currentPageType = currentPage.file.frontmatter?.pageType
			if (currentPageType === type) {
				searchPages.push(currentPage)
			}
		}

		return searchPages
	}
}