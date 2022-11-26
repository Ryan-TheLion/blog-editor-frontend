import React from "react";
import {
  EditorCommonStyles,
  EditorWrapper,
  GlobalStyles,
  StyledDevelopWrapper,
} from "../styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";

interface EditorProps
  extends Pick<
    ReactQuillProps,
    "readOnly" | "placeholder" | "value" | "id" | "className"
  > {}

const Wrapper = {
  Develop: StyledDevelopWrapper,
  Editor: EditorWrapper,
};

export const Editor = ({
  id,
  className,
  value,
  placeholder,
  readOnly,
}: EditorProps) => {
  return (
    <Wrapper.Develop>
      <GlobalStyles />
      <EditorCommonStyles />
      <Wrapper.Editor>
        <ReactQuill
          id={id}
          className={className}
          value={value}
          placeholder={readOnly ? undefined : placeholder}
          readOnly={readOnly}
          theme="snow"
        />
      </Wrapper.Editor>
    </Wrapper.Develop>
  );
};
