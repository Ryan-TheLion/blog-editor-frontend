import React, { useState, useEffect, useRef, useMemo } from "react";
// import "highlight.js/styles/night-owl.css";
import {
  EditorCommonStyles,
  EditorWrapper,
  GlobalStyles,
  StyledDevelopWrapper,
} from "../styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill, ReactQuillProps } from "react-quill";
import { Quill as EditorQuill } from "quill";
import { CustomToolbars, formats, modules } from "../customQuill";

interface EditorProps
  extends Pick<
    ReactQuillProps,
    "readOnly" | "placeholder" | "value" | "id" | "className"
  > {}

const Wrapper = {
  Develop: ({ children, ...props }: any) => {
    return <StyledDevelopWrapper {...props}>{children}</StyledDevelopWrapper>;
  },
  Editor: EditorWrapper,
};

export const Editor = ({
  id,
  className,
  value,
  placeholder,
  readOnly,
}: EditorProps) => {
  const editorRef = useRef<ReactQuill>(null);
  const [editor, setEditor] = useState<EditorQuill>();
  const [contents, setContents] = useState("");

  const module = useMemo(() => modules(editor), [editor]);

  useEffect(() => {
    const _editor = editorRef?.current?.editor;
    if (!_editor) return;

    _editor.root.setAttribute("spellcheck", "false");
    console.log(editorRef.current);
    setEditor(_editor);
  }, []);

  return (
    <Wrapper.Develop>
      <GlobalStyles />
      <EditorCommonStyles />
      <Wrapper.Editor>
        <CustomToolbars />
        <ReactQuill
          ref={editorRef}
          id={id}
          className={className}
          value={value ?? contents}
          onChange={setContents}
          placeholder={readOnly ? undefined : placeholder}
          readOnly={readOnly}
          theme="snow"
          modules={module}
          formats={formats}
        />
      </Wrapper.Editor>
    </Wrapper.Develop>
  );
};
