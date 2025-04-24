import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil";
import { BaseHtmlGenerator } from "./BaseHtmlGenerator";
import { DvPage } from "@/Helpers/ReadUtil/Types";
import { TopicCard } from "./TopicCard";


export class TopicContainer extends BaseHtmlGenerator {
	protected data = {
		os: "",
		cardsHtml: "",
	}

	protected propsConfig = {
		topics: {		}
	}

	protected topicReadUtil: TopicReadUtil;

	constructor() {
		super();
		this.topicReadUtil = new TopicReadUtil();
	}

	protected handler() {
		const os = this.detectOS();
		
		for (const topic of this.props.topics) {
			const topicUtil = this.topicReadUtil.setPage(topic);
			const allPageCount = dv.pages(`"${topicUtil.getFile().folder}"`).length - 1;

			let topicCard = new TopicCard();

			topicCard
				.setProp("topicName", topicUtil.getFile().name)
				.setProp("topicLink", topicUtil.getFile().path)
				.setProp("topicBackgroundLink", this.normalizeLink(topicUtil.getFrontmatter().banner ?? ""))
				.setProp("allPageCount", allPageCount)
				.setProp("os", os);

			this.data.cardsHtml += topicCard.toHtml();
		}
	}

	protected render() {
		return `<div class="topic-container">
			${this.data.cardsHtml}
		</div>`;
	}

	protected detectOS() {
		const ua = navigator.userAgent.toLowerCase();
	
		if (ua.includes("android")) return "android";
		if (ua.includes("windows nt")) return "windows";
		if (ua.includes("macintosh")) return "macOS";
		if (ua.includes("iphone") || ua.includes("ipad")) return "iOS";
		if (ua.includes("x11") || ua.includes("linux")) return "Linux";
	
		return "unknown";
	}

	/**
	 * Нормализует wiki-ссылку
	 * @param {string} link 
	 * @returns {string}
	 */
	protected normalizeLink(link: string): string {
		const match = link.match(/^!\[\[(.+?)\]\]$/);
		return match ? match[1] : link;
	}
}
