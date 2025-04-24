import { Protocol } from "./Types";

/**
 * Создаёт URL ссылку
 */
export class BaseURLGenerator {
	protocol?: Protocol;
	path: string = "";
	query: string = "";


    /**
     * Устанавливает протокол
     * @param {Protocol} protocol 
     * @returns {BaseURLGenerator}
     */
	setProtocol(protocol: Protocol): BaseURLGenerator {
		this.protocol = protocol;
		return this;
	}

    /**
     * Устанавливает путь
     * @param {string} path 
     * @returns {BaseURLGenerator}
     */
	setPath(path: string): BaseURLGenerator {
		const encodedPath = path
			.split("/")
			.map((value) => this.urlEncode(value))
			.join('/');

		this.path = encodedPath;
		return this;
	}

    /**
     * Устанавливает query
     * @param {Record<string, any>} query 
     * @returns {BaseURLGenerator}
     */
	setQuery(query: Record<string, any>): BaseURLGenerator {
		const encodedQuery = Object.entries(query)
			.map(([key, value]) => `${this.urlEncode(key)}=${this.urlEncode(value)}`)
			.join('&');

		this.query = encodedQuery;
		return this;
	}

	/**
	 * Кодирует строку для url
	 * @param {string} string 
	 * @returns {string}
	 */
	urlEncode(string: string): string {
		return encodeURIComponent(string)
			.replace(/[!'()*]/g, (c) => {
				return '%' + c.charCodeAt(0).toString(16).toUpperCase()
			});
	}

	/**
	 * Возвращает строку сформированной ссылки
	 * @returns {string}
	 */
	genUrl(): string {
		let url = "";
		url += this.protocol !== undefined ? `${this.protocol}://` : "";
		url += this.path
		url += this.query !== "" ? `?${this.query}` : "";

		return url;
	}
}