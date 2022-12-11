import { RangeStatic } from "quill";
import { getEditor, getPicker } from "../../lib";

const attachActiveToLabel = (isActive: boolean, target: HTMLElement | null) => {
  if (!isActive && target) {
    target.classList.add("ql-active");
  }
};

export const bindings = {
  inlineCodeBlock: {
    key: "E",
    shortKey: true,
    handler: function (range: RangeStatic, context: any) {
      const editor = getEditor();

      const { index, length } = range;
      const { format } = context;

      const isActive = format?.inlineCode;

      editor.formatText(index, length, "inlineCode", isActive ? false : true);

      attachActiveToLabel(
        isActive,
        document.querySelector("button.ql-inlineCode")
      );
    },
  },
  underline: {
    key: "U",
    shortKey: true,
    handler: function (range: RangeStatic, context: any) {
      const editor = getEditor();

      const { index, length } = range;
      const { format } = context;

      const isActive =
        format?.textUnderline && format.textUnderline === "underline";

      console.log({ isActive });

      editor.formatText(
        index,
        length,
        "textUnderline",
        isActive ? false : "underline"
      );

      attachActiveToLabel(isActive, getPicker("textUnderline").label);
    },
  },
  strike: {
    key: "S",
    shortKey: true,
    handler: function (range: RangeStatic, context: any) {
      const editor = getEditor();

      const { index, length } = range;
      const { format } = context;

      const isActive =
        format?.textUnderline && format.textUnderline === "strike";

      editor.formatText(
        index,
        length,
        "textUnderline",
        isActive ? false : "strike"
      );

      attachActiveToLabel(isActive, getPicker("textUnderline").label);
    },
  },
};
