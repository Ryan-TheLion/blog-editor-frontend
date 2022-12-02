import { QuillOptions } from "react-quill";

const editorFormats: Pick<QuillOptions, "formats"> = {
  formats: [
    "image",
    "video",
    "code",
    "align",
    "color",
    "background",
    "code-block",
  ],
};

export const formats = editorFormats.formats;
