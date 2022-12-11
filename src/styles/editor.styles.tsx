import styled, { createGlobalStyle } from "styled-components";
import { textUnderlineStyles } from "./textUnderline.styles";
import "@fortawesome/fontawesome-free/js/fontawesome.js";
import "@fortawesome/fontawesome-free/js/solid.js";
import { inlineCodeStyles } from "./inlineCode.styles";

export const StyledDevelopWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 10rem;
  justify-content: center;
  align-items: flex-start;
  background-color: #fdf7f7;
`;

export const EditorStyles = createGlobalStyle`
  strong {
    font-weight: bold !important;
  }

  em {
    font-style: italic !important;
  }

  .ql-container.ql-snow {
    border: 1px solid #ccc;
    height: 300px;
    border-radius: 0 0 8px 8px;
    overflow: visible;
  }
  .ql-editor {
    background-color: #fff;
  }
  .ql-snow.ql-toolbar {
    background-color: #eee;
    border-radius: 8px 8px 0 0;
  }
  
  ${textUnderlineStyles}
  ${inlineCodeStyles}

  /* .ql-snow .ql-editor pre.ql-syntax {
    background-color: #002B36;
  } */
`;

export const EditorWrapper = styled.div`
  width: 500px;
  height: 100%;
`;
