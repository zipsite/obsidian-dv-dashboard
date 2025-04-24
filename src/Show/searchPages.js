// поиск и сортировка элементов
//====================================================================//

function getPages() {

}


function getTypedPages() {

}


function getPagesOld(mainTopic) {
	const mainTopicInlinks = mainTopic.file.inlinks;

	let searchPages = {
		topics: [],
		articles: [],

	};

	for (const link of mainTopicInlinks) {
		const currentPage = dv.page(link.path);
		const currentPageType = currentPage.file.frontmatter?.pageType 

		switch (currentPageType) {
			case "topic":
				searchPages.topics.push(currentPage);
				break;
			case "article":
				searchPages.articles.push(currentPage);
				break;
			default:
				break;
		}
	}
	// console.log(searchPages);
	return searchPages;

}