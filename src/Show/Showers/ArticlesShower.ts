import { BaseShower } from "./BaseShower";
import { ArticleLinkNewCreator } from "@/Links/Creators/ArticleLinkNewCreator";

export class ArticleShower extends BaseShower {

	private genNewArticleLink: ArticleLinkNewCreator
	
	constructor() {
		super();
		this.genNewArticleLink = new ArticleLinkNewCreator()
	}

	protected handler(): void {
		
        this.genNewArticleLink.setPage(this.topicReadUtil.getPage());

		const mainTopicId = this.topicReadUtil.getTopicId();
		const articles = dv.pages(`#articleParentId/${mainTopicId}`)

		const listOfArticles = articles.map((article) => {
			return this.locale.getLocale("elemArticleList", {
				articleLink: article.file.link,
				modifiedDate: article.file.mtime.toFormat("dd.MM.yyyy"),
			})
		})

		const newArticleLink = this.genNewArticleLink.getLink();

		dv.header(1, this.locale.getLocale("headerArticleList", { articlesCount: articles.length }))
		dv.list(listOfArticles);
		dv.paragraph(this.locale.getLocale("createNewArticle", { newArticleLink }))
    }
}