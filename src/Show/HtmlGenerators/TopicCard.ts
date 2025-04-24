import { BaseHtmlGenerator } from "./BaseHtmlGenerator";
import { PropsConfig } from "./Types";

/**
 * Генерирует Html для карточки топика
 */
export class TopicCard extends BaseHtmlGenerator {
	
	protected propsConfig:PropsConfig = {
		topicName: {
			// type: String,
		},
		topicLink: {
			// type: String,	
		},
		topicBackgroundLink: {
			// type: String,
		},
		allPageCount: {
			// type: String,
		},
		os: {
			// type: String,
			default: "windows"
		},
	}

	protected render(): string { 
		return `
		<div class="topic-card ${this.getProp("os")}" >
			<a 
				class="topic-card-overlay-link internal-link" 
				data-href="${this.getProp("topicLink")}" 
				href="${this.getProp("topicLink")}" 
				aria-label="${this.getProp("topicName")}">
			</a>
			${(() => {
					return this.getProp("topicBackgroundLink") !== ""
						? `<div class="topic-card-img-box">
				<span class="topic-card-img internal-embed media-embed image-embed" src="${this.getProp("topicBackgroundLink")}">
				</div>`
						: "";
				})()}
			<div class="topic-card-text-block">
				<div class="topic-card-topline">
					<p class="topic-card-title">${this.getProp("topicName")}</p>
					<p class="topic-card-counter">(${this.getProp("allPageCount")})</p>
				</div>
			</div>
		</div>`;
	}
}


