import { DateTime } from "luxon";

export type DvPage = {
    file: DvPageFile
    [key: string]: any;
}

export type DvPageFile = {
    path: string,
    name: string,
    ext: string,
    folder: string,
    ctime: DateTime,
    cday: DateTime,
    mtime: DateTime,
    mday: DateTime,
    size: number,
    starred: boolean,
    link: DvPageFileLink,
    frontmatter: Frontmatter,
    [key: string]: any;
}

export type DvPageFileLink = {
    path: string,
    embed: boolean,
    type: string,
    [key: string]: any;
}

export type Frontmatter = {
    [key: string]: any;   
}