/**
 * Класс для импорта/экспорта элементов кода
 */
class Relation {

    currentFolder: string
    imported: Record<string, any>

	constructor(currentFolder: string) {
        this.currentFolder = currentFolder;
		this.imported = {};
	}

	/**
	 * Перебирает импорты, выполняет находящиеся в них асинк функции
	 * после возвращает все импорты
	 * @returns {Record<string, any>} 
	 */
    async getImport(): Promise<Record<string, any>> {
        let computeImported: Record<string, any> = {}
		for (const key in this.imported) {
			computeImported[key] = await this.imported[key]();
		}
        return computeImported;
    }

	/**
	 * делает импорт
	 * @param {string} source 
	 * @param {string} importName 
     * @returns {Promise<void>}
	 */
	async importer(source: string, importName: string = ""): Promise<void> {
        
        if (importName === "") {
            let sourcePathArr = source.split("/");
            importName = sourcePathArr[sourcePathArr.length - 1];
        }
        
        let computedSource = [this.currentFolder, source].join("/");
		
		await dv.view(computedSource, { 
			relation: new Relation(this.currentFolder), 
			exporter: this.exporter.bind(this, importName)
		});
	}

	/**
	 * Хандлер, внедряющийся в инпуты для экспорта 
	 * @param {string} importName 
	 * @param {any} exported 
	 */
	exporter(importName: string, exported: any) {
        this.imported[importName] = exported;
	}
}