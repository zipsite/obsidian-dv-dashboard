import { BaseLinkNewCreator } from "./BaseLinkNewCreator";


export class ArticleLinkNewCreator extends BaseLinkNewCreator {

	protected handler() {
        const articleFileName = this.locale.getLocale("newArticleName");
		const articlePath = this.saveFolders.getEntityPath("articleSaveFolder", articleFileName)
		const nowDate = new Date();
		const formattedDate = nowDate.toLocaleString('sv-SE').replace(' ', 'T');
    
		this.content
			.addContentFrontmatter({
				pageType: "article",
				createDate: formattedDate,
			})
			.addContentString(this.genRelationBlock("relatedArticleInfo"));

		const content = this.content.toString();

        return this.obsidianURL.genNewLink(articlePath, content)
	}
}