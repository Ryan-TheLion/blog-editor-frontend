import { renderToString } from "react-dom/server";
import { ImClearFormatting } from "react-icons/im";
import { BsTypeUnderline } from "react-icons/bs";
import { RxStrikethrough } from "react-icons/rx";
import { Quill } from "react-quill";

// icon picker를 위한 icons 값 (svg -> string)
const textUnderlineIcons = {
  "": renderToString(
    <ImClearFormatting style={{ fontSize: "0.9em", paddingLeft: "3px" }} />
  ),
  underline: renderToString(<BsTypeUnderline />),
  strike: renderToString(<RxStrikethrough />),
};

// textUnderline format 등록
const Parchment = Quill.import("parchment");
const TextUnderline = new Parchment.Attributor.Class(
  "textUnderline",
  "ql-textUnderline",
  {
    scope: Parchment.Scope.INLINE,
  }
);
TextUnderline.whiteList = ["underline", "strike"];

Quill.register(TextUnderline, true);

// textUnderline format의 select option과 icon picker 생성
export const registerTextUnderline = () => {
  const IconPicker = Quill.import("ui/icon-picker");

  const select = document.querySelector(
    "select.ql-textUnderline"
  ) as HTMLSelectElement;

  TextUnderline.whiteList.forEach((value: string) => {
    const option = document.createElement("option");
    option.label = "";
    option.value = value;
    if (value === "underline") option.selected = true;

    select.appendChild(option);
  });
  const defaultOption = document.createElement("option");
  defaultOption.label = "";
  defaultOption.value = "";
  select.appendChild(defaultOption);

  const picker = new IconPicker(select, textUnderlineIcons);

  return picker;
};
