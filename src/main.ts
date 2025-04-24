import { HeadShower } from "./Show/Showers/HeadShower";

/**
 * Печатает код в кодовых блоках
 * @param {string} header 
 * @param {string} source 
 */
function printCode(header: string, source: string) {
	dv.header(1, header);
	dv.el("div", `<pre>
    <code data-line="0">${source}</code>
</pre>`, { cls: "el-pre" });
}

/**
 * Показывает лог в кодовом блоке
 * @param {string} source 
 */
function log(source: string) {
	printCode("log", source);
}

function main() {
    const currentPage = dv.current();
    const headShower =  new HeadShower();

    headShower
        .setPage(currentPage)
        .show();
}

main();
