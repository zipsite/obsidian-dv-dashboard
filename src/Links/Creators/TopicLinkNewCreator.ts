import { Config } from "@/Helpers/Config";
import { BaseLinkNewCreator } from "./BaseLinkNewCreator";



export class TopicLinkNewCreator extends BaseLinkNewCreator {

	private config: Config;

	constructor() {
		super();
		this.config = new Config();
	}

	protected handler() {
		const subTopicId = this.genUniqueId()
		const subTopicFileName = this.locale.getLocale("newTopicName");
		const subTopicPath = this.saveFolders.getEntityPath("topicSaveFolder", subTopicId, subTopicFileName);

		this.content
			.addContentFrontmatter({
				pageType: "topic",
				cssclasses: ["topic"],
				banner: "",
			})
			.addContentString(this.genRelationBlock("relatedTopicInfo"))
			.addContentString(this.locale.getLocale("headerDescriptionPage"))
			.addContentString(this.genDvBlock());

		const content = this.content.toString()

		return this.obsidianURL.genNewLink(subTopicPath, content);
	}

	/**
	 * Возвращает строку с уникальным Id
	 * @returns {string}
	 */
	private genUniqueId(): string {
		const timestamp = Date.now();
		const random = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
		return `${timestamp}-${random}`;
	}

	/**
	 * Возвращает кодовое поле
	 * @returns {string}
	 */
	private genDvBlock(): string {
		return `\`\`\`dataviewjs
await dv.view(\"${this.config.get("scriptPath")}\")
\`\`\`\n`
	}
}