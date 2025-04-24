import { BaseLinkNewCreator } from "./BaseLinkNewCreator";


export class ArticleLinkNewCreator extends BaseLinkNewCreator {

	protected handler() {
        const mainTopicId = this.topicReadUtil.getTopicId();
        const articleFileName = this.locale.getLocale("newArticleName");
		const articlePath = this.saveFolders.getEntityPath("articleSaveFolder", articleFileName)
    
		this.content
			.addContentFrontmatter({
				tags: [
					`articleParentId/${mainTopicId}`
				],
				pageType: "article",
			})
			.addContentString(this.genRelationBlock("relatedArticleInfo"));

		const content = this.content.toString();

        return this.obsidianURL.genNewLink(articlePath, content)
	}
}