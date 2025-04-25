import { FoldersUtil } from "@/Helpers/FoldersUtil";
import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil"
import { DvPage, Frontmatter } from "@/Helpers/ReadUtil/Types";
import { DateTime } from "luxon";
import { describe, expect, test } from "vitest"

const mockaDvPage: DvPage = {
    file: {
        path: "00-Root/Root.md",
        name: "Root",
        ext: "md",
        folder: "00-Root",
        ctime: DateTime.now(),
        cday: DateTime.now(),
        mtime: DateTime.now(),
        mday: DateTime.now(),
        size: 56,
        starred: false,
        link: {
            path: "",
            embed: false,
            type: "file",
        },
        inlinks: [],
        frontmatter: {}
    }
}

const mockaFrontmatter: Frontmatter = {

}

const folderTypes: any = [
    {
        describe: "для сохранения топиков",
        path: {
            default: "topic",
            override: "newTopic",
            absoluteOverride: "/newTopic",
        },
        value: "topicSaveFolder",
    },
    {
        describe: "для сохранения статей",
        path: {
            default: "article",
            override: "newArticle",
            absoluteOverride: "/newArticle",
        },
        value: "articleSaveFolder",
    }
]

const overrideTypes: any = [
    {
        describe: "папку по умолчанию",
        type: "default",
        rootDir: mockaDvPage.file.folder
    },
    {
        describe: "относительную папку",
        type: "override",
        rootDir: mockaDvPage.file.folder
    },
    {
        describe: "aбсолютную папку",
        type: "absoluteOverride",
        rootDir: ""
    }
]


test("Устанавливаем для Folder ридер топика", () => {
    const topicReadUtil = new TopicReadUtil();
    const foldersUtil = (new FoldersUtil())
        .setTopicReadUtil(topicReadUtil);
    expect(foldersUtil.setTopicReadUtil(topicReadUtil))
        .toBeInstanceOf(FoldersUtil);
})

describe("Тестирование метода getFolder", () => {
    for (const folderType of folderTypes) {
        for (const overrideType of overrideTypes) {
            test(`Получаем ${overrideType.describe} ${folderType.describe}`, () => {

                const overridePath = folderType.path[overrideType.type];

                let page = mockaDvPage;
                page.file.frontmatter[folderType.value] = overridePath;

                const topicReadUtil = (new TopicReadUtil())
                    .setPage(mockaDvPage)
                const foldersUtil = (new FoldersUtil())
                    .setTopicReadUtil(topicReadUtil);

                let toBe = (() => {
                    if (overrideType.type === "absoluteOverride") {
                        return overridePath.slice(1)
                    } else {
                        return [overrideType.rootDir, overridePath].join("/")
                    }
                })()

                expect(foldersUtil.getFolder(folderType.value))
                    .toBe(toBe);

            })
        }

    }
})

describe("Тестирование метода getEntityPath", () => {

    const rest = {
        array: [
            "rest",
            "path",
            "toFile",

        ],
        string: "rest/path/toFile"
    }

    for (const folderType of folderTypes) {
        for (const overrideType of overrideTypes) {
            test(`Получаем ${overrideType.describe} ${folderType.describe}`, () => {

                const overridePath = folderType.path[overrideType.type];

                let page = mockaDvPage;
                page.file.frontmatter[folderType.value] = overridePath;

                const topicReadUtil = (new TopicReadUtil())
                    .setPage(mockaDvPage)
                const foldersUtil = (new FoldersUtil())
                    .setTopicReadUtil(topicReadUtil);

                let toBe = (() => {
                    if (overrideType.type === "absoluteOverride") {
                        return [overridePath.slice(1), rest.string].join("/")
                    } else {
                        return [overrideType.rootDir, overridePath, rest.string].join("/")
                    }
                })()

                expect(foldersUtil.getEntityPath(folderType.value, ...rest.array))
                    .toBe(toBe);

            })
        }
    }
})

describe("Тестирование метода getAllFolders()", () => {

    type example = {
        describe: string,
        example: Frontmatter,
        toBe: Record<string, any>
    }

    const frontmatterTypes: Array<example> = [
        {
            describe: "Дефолтные папки для топиков и статей",
            example: {
                topicSaveFolder: "",
                articleSaveFolder: ""
            }, 
            toBe: {
                topicSaveFolder: `${mockaDvPage.file.folder}/topics` ,
                articleSaveFolder: `${mockaDvPage.file.folder}/articles` 
            }
        },
        {
            describe: "Абсолютные папки для топиков и статей",
            example: {
                topicSaveFolder: "/",
                articleSaveFolder: "/hoper"
            }, 
            toBe: {
                topicSaveFolder: `` ,
                articleSaveFolder: `hoper` 
            }
        },
        {
            describe: "Относительные папки для топиков и статей",
            example: {
                topicSaveFolder: "newTopic",
                articleSaveFolder: "newArticle"
            }, 
            toBe: {
                topicSaveFolder: `${mockaDvPage.file.folder}/newTopic` ,
                articleSaveFolder: `${mockaDvPage.file.folder}/newArticle` 
            }
        },
    ]

    for (const frontmatterType of frontmatterTypes) {
        test(frontmatterType.describe, () => {

            const computeFrontmatter = frontmatterType.example
    
            let page = mockaDvPage;
            page.file.frontmatter = computeFrontmatter;
    
            const topicReadUtil = (new TopicReadUtil())
                .setPage(page);
            const foldersUtil = (new FoldersUtil())
                .setTopicReadUtil(topicReadUtil);

            expect(foldersUtil.getAllFolders())
                .toEqual(frontmatterType.toBe)
        
        })   
    }
})