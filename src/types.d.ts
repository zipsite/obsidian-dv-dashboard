import { DvPage } from "./Helpers/ReadUtil/Types";

declare global {
    const app: any
    const dv: {
        page: (path: string) => DvPage;
        pages: (source: string) => Array<DvPage>;
        header: (level: number, text: string) => void;
        paragraph: (text: string) => void;
        el: (element: string, text: string, params: Record<string, any>) => void
        list: (elements: Array<any>) => void;
        current: () => DvPage;
        view: (path: string, input: Record<string, any>) => Promise<any>
    };
}