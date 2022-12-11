import { Quill } from "react-quill";

const Code = Quill.import("formats/code");

export class InlineCode extends Code {
  static blotName = "inlineCode";
}

Quill.register(InlineCode, true);
