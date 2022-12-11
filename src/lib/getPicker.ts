import { getEditor } from "./getEditor";

export const getPicker = (formatName: string) => {
  const editor = getEditor();

  // @ts-ignore
  const [picker] = editor.theme.pickers.filter(
    // @ts-ignore
    (picker) => picker.container.classList.contains(`ql-${formatName}`)
  );

  return picker;
};
