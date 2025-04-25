import { BaseLinkNewCreator } from "./BaseLinkNewCreator";


export class ArticleLinkNewCreator extends BaseLinkNewCreator {

	protected handler() {
        const articleFileName = this.locale.getLocale("newArticleName");
		const articlePath = this.saveFolders.getEntityPath("articleSaveFolder", articleFileName)
    
		this.content
			.addContentFrontmatter({
				pageType: "article",
			})
			.addContentString(this.genRelationBlock("relatedArticleInfo"));

		const content = this.content.toString();

        return this.obsidianURL.genNewLink(articlePath, content)
	}
}