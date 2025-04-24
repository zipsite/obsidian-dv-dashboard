import { PropsConfig } from "./Types";

/**
 * Абстрактный класс для элементов, генерирующих html строку
 */
export abstract class BaseHtmlGenerator {

	protected props: Record<string, any> = {}
	protected propsConfig:PropsConfig = {}

	/**
	 * Позволяет передать входные данные для элемента
	 * @param {string} key 
	 * @param {any} value 
	 * @returns {BaseHtmlGenerator}
	 */
	setProp(key: string, value: any): BaseHtmlGenerator {
		this.checkProp(key);

		const valueConfig = this.propsConfig[key];

		if (valueConfig.type) {
			if (!(value instanceof valueConfig.type)) {
				console.log(value);
				throw new Error(`invalid props type for key ${key}`)
			}
		}

		this.props[key] = value;
		return this;
	}

	/**
	 * Возвращает запрошенный пропс по имени пропса
	 * @param {string} key 
	 * @returns {any}
	 */
	protected getProp(key: string): any {
		this.checkProp(key);

		const valueConfig = this.propsConfig[key];
		if (!this.props.hasOwnProperty(key)) {
			if (valueConfig.default) {
				this.props[key] = valueConfig.default
			} else {
				throw new Error(`prop ${key} not set`);
			}
		}
		return this.props[key];
	}

	/**
	 * Проверяет есть ли пропс c таким именем или выкидывает исключение
	 * @param {string} key
	 * @throws {Error} 
	 */
	protected checkProp(key: string) {
		if (!this.propsConfig.hasOwnProperty(key)) {
			throw new Error(`key ${key} not found in props`);
		}
	}

	/**
	 * Внешняя функция для получения html строки
	 * @returns {string}
	 */
	toHtml(): string {
		this.handler();
		const htmlString = this.render();
		if (typeof htmlString !== "string" || htmlString === "") {
			throw new Error("method render must return string");
		}
		return htmlString;
	}

	/**
	 * В этом методе происходят вычисления всех нужных данных для рендера
	 */
	protected handler(): void {}

	/**
	 * Метод, возвращающий html строку
	 */
	protected abstract render(): string
}