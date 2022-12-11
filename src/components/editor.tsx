import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  EditorStyles,
  EditorWrapper,
  GlobalStyles,
  StyledDevelopWrapper,
} from "../styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { ReactQuillProps } from "react-quill";
import {
  CustomFormatName,
  customIconPickers,
  CustomToolbars,
  formats,
  modules,
} from "../customQuill";
import { getEditor, getPicker } from "../lib";

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
  const [contents, setContents] = useState("");

  // eslint-disable-next-line
  const module = useMemo(() => modules, []);

  useLayoutEffect(() => {
    // helper function
    const changeAllCustomPickersToIconPicker = (
      targetCustomFormatList: CustomFormatName[]
    ) => {
      targetCustomFormatList.forEach((customFormat) =>
        changeCustomPickerToIconPicker(customFormat)
      );
    };

    // helper function
    const changeCustomPickerToIconPicker = (
      targetCustomFormat: CustomFormatName
    ) => {
      const editor = getEditor();
      // @ts-ignore
      const pickers = editor.theme.pickers;
      const targetPicker = getPicker(targetCustomFormat);

      const targetIndex = Array.from(pickers).findIndex(
        (picker) => picker === targetPicker
      );

      if (targetIndex > -1) {
        pickers[targetIndex] = customIconPickers[targetCustomFormat];
      }

      // Picker, IconPicker가 같이 존재해서 중복되기 때문에 사용되지 않는 기존 Picker 제거
      const removeTarget = document.querySelector(
        `.ql-${targetCustomFormat}.ql-picker[style*="display: none;"]`
      );
      removeTarget?.parentElement?.removeChild(removeTarget);
    };

    // run
    changeAllCustomPickersToIconPicker(["textUnderline"]);
  }, []);

  useEffect(() => {
    const editor = getEditor();
    editor.root.setAttribute("spellcheck", "false");
    console.log(editor);
  }, []);

  return (
    <Wrapper.Develop>
      <GlobalStyles />
      <EditorStyles />
      <Wrapper.Editor
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "e") {
            // chrome ctrl + e 충돌 방지
            e.preventDefault();
          }
          if (e.ctrlKey && e.key === "s") {
            // chrome ctrl + s 충돌 방지
            e.preventDefault();
          }
        }}
      >
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
