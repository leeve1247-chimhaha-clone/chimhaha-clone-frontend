/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import style from "./ExampleTheme.module.css";

export default {
    code: 'editor-code',
    heading: {
        h1: style.editorHeadingH1,
        h2: style.editorHeadingH2,
        h3: style.editorHeadingH3,
        h4: style.editorHeadingH4,
        h5: style.editorHeadingH5,
    },
    image: style.editorImage,
    link: style.editorLink,
    list: {
        listitem: style.editorListitem,
        nested: {
            listitem: style.editorNestedListitem,
        },
        ol: style.editorListOl,
        ul: style.editorListUl,
    },
    ltr: style.ltr,
    paragraph: style.editorParagraph,
    placeholder: style.editorPlaceholder,
    quote: style.editorQuote,
    rtl: style.rtl,
    text: {
        bold: style.editorBold,
        code: style.editorTextCode,
        hashtag: style.editorTextHashtag,
        italic:  style.editorTextItalic,
        overflowed: style.editorTextOverflowed,
        strikethrough: style.editorTextStrikethrough,
        underline: style.editorTextUnderline,
        underlineStrikethrough: style.editorTextUnderlineStrikethrough,
    },
};
