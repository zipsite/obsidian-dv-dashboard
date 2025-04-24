/**
 * заменяет плейсхолдеры
 */
export abstract class BaseReplacer {

	protected string: string = "";
	protected regex: RegExp = /./;
	protected params: Record<string, string> = {};

	/**
	 * Устанавливает регулярное выражение
	 * @param {RegExp} regex 
	 * @returns {BaseReplacer}
	 */
	setRegex(regex: RegExp): BaseReplacer {
		this.regex = regex;
		return this;
	}

	/**
	 * Устанавливает строку над которой будет обработка
	 * @param {string} string 
	 * @returns {BaseReplacer}
	 */
	setString(string: string): BaseReplacer {
		this.string = string;
		return this;
	}

	/**
	 * Устанавливает параметры для замены
	 * @param {object} params 
	 * @returns {BaseReplacer}
	 */
	setParams(params: Record<string, string>): BaseReplacer {
		this.params = params;
		return this;
	}

	/**
	 * Возвращает строку с заменёнными плейсхолдерами
	 * @returns {string}
	 */
	toString(): string {
		return this.string.replace(this.regex, (_, placeholderName) => {
			if (!this.params.hasOwnProperty(placeholderName)) {
				throw new Error(`not found parameter with key ${placeholderName}`);
			}
			return this.params[placeholderName];
		});
	}
}