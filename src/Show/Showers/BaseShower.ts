import { Locale } from "@/Helpers/Locale";
import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil";
import { DvPage } from "@/Helpers/ReadUtil/Types";

export abstract class BaseShower {

    protected topicReadUtil: TopicReadUtil
    protected locale: Locale;

    constructor() {
        this.topicReadUtil = new TopicReadUtil()
        this.locale = new Locale();
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