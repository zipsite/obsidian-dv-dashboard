import { BaseShower } from "./BaseShower";
import { TopicLinkNewCreator } from "@/Links/Creators/TopicLinkNewCreator";
import { TopicContainer } from "@/Show/HtmlGenerators/TopicContainer";

export class TopicsShower extends BaseShower {

    genNewTopicLink: TopicLinkNewCreator;
    

    constructor() {
        super();
        this.genNewTopicLink = new TopicLinkNewCreator()
        
    }

    protected handler(): void {

        this.genNewTopicLink.setPage(this.topicReadUtil.getPage());

        const mainTopicId = this.topicReadUtil.getTopicId();
        const topics = dv.pages(`#topicParentId/${mainTopicId}`);
        const topicContainer = (new TopicContainer()).setProp("topics", topics);
        const newTopicLink = this.genNewTopicLink.getLink();

        dv.header(1, this.locale.getLocale("headerTopicList", { topicsCount: topics.length }))
        dv.paragraph(topicContainer.toHtml());
        dv.paragraph(this.locale.getLocale("createNewTopic", { newTopicLink }))
    }
    
}