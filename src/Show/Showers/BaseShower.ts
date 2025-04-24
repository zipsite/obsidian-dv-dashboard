import { Locales } from "@/Helpers/Locales/Locales";
import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil";
import { DvPage } from "@/Helpers/ReadUtil/Types";

export abstract class BaseShower {

    protected topicReadUtil: TopicReadUtil
    protected locale: Locales;

    constructor() {
        this.topicReadUtil = new TopicReadUtil()
        this.locale = new Locales();
    }

    /**
     * Передаём страницу, над которой будет вестись работа
     * @param page 
     * @returns {BaseShower}
     */
    setPage(page: DvPage): BaseShower {
        this.topicReadUtil.setPage(page);
        return this;
    }


    /**
     * Для запуска показа извне класса
     */
    show() {
        this.handler();
    }

    protected abstract handler(): void
}