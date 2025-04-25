import { PageReadUtil } from "@/Helpers/ReadUtil/PageReadUtil";
import { NotFoundTopicIdError } from "./Errors/NotFoundTopicIdError";

export class TopicReadUtil extends PageReadUtil {

	/**
	 * Возвращает id топика
	 * @returns {string}
	 */
	getTopicId(): string {

		const tags = this.getFrontmatter().tags ?? [];

		let topicId = "";

		for (const tag of tags) {
			const match = tag.match(/^topicId\/(.*)$/);
			if (match) {
				topicId = match[1] ? match[1] : "";
				break;
			}
		}
		
		if (topicId === "") {
			throw new NotFoundTopicIdError(this.getFile().path)
		}

		return topicId;
	}
}