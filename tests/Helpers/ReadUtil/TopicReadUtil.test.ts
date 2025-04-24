import { NotFoundTopicIdError } from "@/Helpers/ReadUtil/Errors/NotFoundTopicIdError";
import { PageDontSetError } from "@/Helpers/ReadUtil/Errors/PageDontSetError";
import { TopicReadUtil } from "@/Helpers/ReadUtil/TopicReadUtil";
import { DvPage, Frontmatter } from "@/Helpers/ReadUtil/Types";
import { DateTime } from "luxon";
import { expect, test } from "vitest"

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
        frontmatter: {}
    }
}

const mockaFrontmatter: Frontmatter = {
    tags: [
        "topicId/234876"
    ]
}

// const topicReadUtil = new TopicReadUtil();

// topicReadUtil.setPage
// topicReadUtil.getPage
// topicReadUtil.getFile
// topicReadUtil.getTopicId
// topicReadUtil.getFrontmatter

test("Получение страницы, когда она установленна", () => {
    const topicReadUtil = (new TopicReadUtil())
        .setPage(mockaDvPage);

    expect(topicReadUtil.getPage())
        .toEqual(mockaDvPage);
})

test("Получение страницы, когда она не установленна", () => {
    const topicReadUtil = new TopicReadUtil();

    expect(() => topicReadUtil.getPage())
        .toThrow(new PageDontSetError());
})

test("Получение id топика, если он есть", () => {
    let page = mockaDvPage;

    page.file.frontmatter = {
        tags: [
            "topicId/234876"
        ]
    }

    const topicReadUtil = (new TopicReadUtil())
        .setPage(page);

    expect(topicReadUtil.getTopicId())
        .toBe("234876");
})

test("Получение id топика, если его нет", () => {
    let page = mockaDvPage;

    const topicReadUtil = (new TopicReadUtil())
        .setPage(page);

    expect(() => topicReadUtil.getTopicId())
        .toThrow(new NotFoundTopicIdError(page.file.path))
})