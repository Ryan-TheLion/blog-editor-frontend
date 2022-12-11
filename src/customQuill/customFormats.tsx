import { QuillOptions } from "react-quill";

export type CustomFormatName = keyof typeof customFormat;

const customFormat = {
  textUnderline: "textUnderline",
};

const editorFormats: Pick<QuillOptions, "formats"> = {
  formats: [
    "header",
    "size",
    "bold",
    "italic",
    "list",
    "color",
    "background",
    "align",
    "image",
    "video",
    "link",
    "code-block",
    "textUnderline",
    "inlineCode",
  ],
};

export const formats = editorFormats.formats;
