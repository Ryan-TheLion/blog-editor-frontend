import { Quill } from "react-quill";
import { css } from "styled-components";

const Parchment = Quill.import("parchment");
const TextUnderlineStyle = new Parchment.Attributor.Style(
  "textUnderline",
  "text-decoration",
  {
    scope: Parchment.Scope.INLINE,
  }
);
TextUnderlineStyle.whiteList = ["underline", "line-through"];
Quill.register("attributors/style/textUnderline", TextUnderlineStyle, true);

// TODO:
//  whiteList의 속성 값과 style attributor의 attrName, keyName을 활용하여
//  .ql-editor .ql-${TextUnderlineStyle.attrName}-${TextUnderlineStyle.whiteList[index]} {
//    [textUnderlineStyle.keyName]: ${TextUnderlineStyle.whiteList[index]}
//  }
//  => style 생성 자동화
export const textUnderlineStyles = css`
  .ql-toolbar .ql-textUnderline {
    font-size: 18px;
  }
  .ql-editor .ql-textUnderline-underline {
    text-decoration: underline;
  }
  .ql-editor .ql-textUnderline-strike {
    text-decoration: line-through;
  }
`;
