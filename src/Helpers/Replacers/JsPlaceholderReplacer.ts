import { BaseReplacer } from "@/Helpers/Replacers/BaseReplacer";
/**
 * заменяет js плейсхолдеры
 */
export default class JsPlaceholderReplacer extends BaseReplacer {

	/**
	 * Регулярное выражение для поиска и замены js плейсхолдеров
	 */
	protected regex = /\$\{([a-zA-Z_$][0-9a-zA-Z_$]*)\}/g;

}