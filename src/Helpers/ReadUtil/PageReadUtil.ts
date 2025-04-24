import { DvPage, DvPageFile, Frontmatter } from "@/Helpers/ReadUtil/Types";

/**
 * утилиты для чтения страницы
 */
export abstract class PageReadUtil {
    
    page?: DvPage

    /**
     * Устанавливает страницу в объект
     * @param {object} page 
     * @returns 
     */
    setPage(page: DvPage) {
        this.page = page;
        return this;
    }

    /**
     * Возвращает объект страницы
     * @returns {DvPage}
     */
    getPage(): DvPage {
        if (this.page === undefined) {
            throw new Error("page dont set");
        }
        return this.page;
    }

    /**
     * Получает объект файла
     * @returns {DvPageFile}
     */
    getFile(): DvPageFile {
        return this.getPage().file;
    }

    /**
     * Получает объект frontmatter
     * @returns {Frontmatter}
     */
    getFrontmatter(): Frontmatter {
        return this.getFile().frontmatter;
    }


}