import { DvPage, DvPageFile, Frontmatter } from "@/Helpers/ReadUtil/Types";
import { PageDontSetError } from "./Errors/PageDontSetError";

/**
 * утилиты для чтения страницы
 */
export abstract class PageReadUtil {
    
    protected page?: DvPage

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
            throw new PageDontSetError();
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