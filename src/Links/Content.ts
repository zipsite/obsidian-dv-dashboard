import { Frontmatter } from "@/Helpers/ReadUtil/Types";
import { BaseURLGenerator } from "./URLGenerators/BaseURLGenerator";

/**
 * Позволяет создавать контент
 */
export class Content {

	contentStrings: Array<string> = [];
	genUrl: BaseURLGenerator;

	constructor() {
		this.genUrl = (new BaseURLGenerator());
	}

	/**
	 * Добавляет строку в контент
	 * @param {string} string 
	 * @returns {Content}
	 */
	addContentString(string: string): Content {
		this.contentStrings.push(string);
		return this;
	}

	/**
	 * Добавляет фронтматтер свойства в контент
	 * @param {Frontmatter} frontmatterObject 
	 * @returns {Content}
	 */
	addContentFrontmatter(frontmatterObject: Frontmatter): Content {
		this.addContentString(this.toFrontmatterString(frontmatterObject))
		return this;
	}

	/**
	 * Возвращает контент в виде строки
	 * @returns {string}
	 */
	toString(): string {
		return this.contentStrings.join("\n");
	}

	/**
	 * Преобразовывает объекты js в yml строку
	 * @param {Frontmatter} frontmatter 
	 * @returns {string}
	 */
	toFrontmatterString(frontmatter: Frontmatter): string {
		if (typeof frontmatter !== "object") {
			throw new Error("frontmatterObject must be type object");
		}
		let stringFrontmatter: string = '';

		for (const key in frontmatter) {
			const value = frontmatter[key];
			if (Array.isArray(value)) {
				stringFrontmatter += `${key}:\n`;
				value.forEach(item => {
					stringFrontmatter += ` - ${item}\n`;
				});
			} else {
				stringFrontmatter += `${key}: ${value}\n`;
			}
		}
		stringFrontmatter = "---\n" + stringFrontmatter + "---\n";
		return stringFrontmatter;
	}
}
