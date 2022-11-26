import styled, { createGlobalStyle } from "styled-components";

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

export const EditorCommonStyles = createGlobalStyle`
  .ql-container.ql-snow {
    border: 1px solid #ccc;
    height: 300px;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
  .ql-editor {
    background-color: #fff;
  }
  .ql-snow.ql-toolbar {
    background-color: #eee;
    border-radius: 8px 8px 0 0;
  }
`;

export const EditorWrapper = styled.div`
  width: 500px;
  height: 100%;
`;
