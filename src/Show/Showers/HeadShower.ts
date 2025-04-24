import { ArticleShower as ArticlesShower } from "./ArticlesShower";
import { BaseShower } from "./BaseShower";
import { TopicsShower } from "./TopicsShower";


export class HeadShower extends BaseShower {
    
    private topicsShower: TopicsShower
    private articlesShower: ArticlesShower

    constructor() {
        super();
        this.topicsShower = new TopicsShower()
        this.articlesShower = new ArticlesShower();
    }
    
    protected handler(): void {
        
        this.topicsShower
            .setPage(this.topicReadUtil.getPage())
            .show();

        this.articlesShower
            .setPage(this.topicReadUtil.getPage())
            .show();

    }
}