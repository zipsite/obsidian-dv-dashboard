import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil";

/**
 * Вычисление пути сохранения топиков и статей
 */
export class Folders {

	folderConfig: Record<string, string> = {
		topicSaveFolder: "topics",
		articleSaveFolder: "articles",
	}

	topicReadUtil: TopicReadUtil;

	constructor(topicReadUtil: TopicReadUtil) {
		this.topicReadUtil = topicReadUtil;
	}

	/**
	 * Получает абсолютный путь относительно папки топика и типа пути
	 * @param {string} type 
	 * @param  {...string} restPath 
	 * @returns {string}
	 */
	getEntityPath(type: string, ...restPath: string[]): string {

		const saveFolder = this.getFolder(type);
		
		let pathArr = [];
		if (saveFolder !== "") {
			pathArr.push(saveFolder);
		}
		pathArr.push(...restPath);

		return pathArr.join("/");
	}

	/**
	 * Получает папку для сохранения
	 * @param {string} key 
	 * @returns {string}
	 */
	getFolder(key: string): string {
		let entitySaveFolder = this.folderConfig[key];

		const frontmatter = this.topicReadUtil.getFrontmatter();
		if (frontmatter[key] && typeof frontmatter[key] === 'string') {
			entitySaveFolder = frontmatter[key];
		}

		let pathArray = [];

		if (entitySaveFolder.startsWith('/')) {
			if (entitySaveFolder !== "") {
				pathArray.push(entitySaveFolder.slice(1));
			}
		} else {
			const topicFile = this.topicReadUtil.getFile();
			pathArray.push(topicFile.folder, entitySaveFolder);
		}

		let pathString = pathArray.join("/");

		return pathString;
	}

	/**
	 * Получает папки для всех сохранений
	 * @returns {Record<string, string>}
	 */
	getAllFolders(): Record<string, string> {
		let folders: Record<string, string> = {};
		for (const key in this.folderConfig) {
			folders[key] = this.getFolder(key);
		}
		return folders;
	}
}