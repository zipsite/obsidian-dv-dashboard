// Интструментарий для создания ссылок
//====================================================================//

import { BaseURLGenerator } from "./BaseURLGenerator";
import { Action } from "./Types";

/**
 * Создаёт ObsidianUri
 */
export class ObsidianURLGenerator extends BaseURLGenerator {

	constructor() {
		super();
		this.setProtocol("obsidian");
	}

	/**
	 * Устанавливаем действие
	 * @param {Action} action 
	 * @returns {ObsidianURLGenerator}
	 */
	setAction(action: Action): ObsidianURLGenerator {
		this.setPath(action);
		return this;
	}

	/**
	 * Устанавливаем параметры
	 * @param {Record<string, any>} params 
	 * @returns {ObsidianURLGenerator}
	 */
	setParams(params: Record<string, any>): ObsidianURLGenerator {
		this.setQuery(params)
		return this;
	}

	/**
	 * Создание ссылки для создания файла
	 * @param {string} path 
	 * @param {string} content 
	 * @param {boolean} silent 
	 * @param {boolean} overwrite 
	 * @returns {string}
	 */
	genNewLink(
		path: string, 
		content: string = "", 
		silent: boolean = true, 
		overwrite: boolean = false,
	): string {

		this.setAction("new")
			.setParams({
				file: path,
				content,
				silent,
				overwrite,
			});

		return this.genUrl();
	}

	/**
	 * Создаёт ссылку для открытия файла
	 * @param {string} path 
	 * @returns {string}
	 */
	genOpenLink(path: string): string {
		this.setAction("open")
			.setParams({
				file: path,
			});

		return this.genUrl();
	}
}