import { Quill } from "react-quill";
import { Quill as QuillEditor } from "quill";

export const getEditor = () => {
  const editor = Quill.find(
    document.querySelector(".ql-container")!
  ) as QuillEditor;

  return editor;
};
