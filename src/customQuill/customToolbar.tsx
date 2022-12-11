import { useLayoutEffect } from "react";
import { BiCode } from "react-icons/bi";
import { RxHeading, RxFontSize } from "react-icons/rx";
import { registerTextUnderline } from "./formats";

export const customIconPickers = {
  textUnderline: {} as any,
};

// TODO: [header, fontSize] inline styles => styledComponent를 이용하여 component로 변경
export const CustomToolbars = () => {
  useLayoutEffect(() => {
    const registerCustomFormatIconPicker = () => {
      const textUnderlineIconPicker = registerTextUnderline();
      customIconPickers.textUnderline = textUnderlineIconPicker;
    };

    registerCustomFormatIconPicker();
  }, []);

  return (
    <div id="toolbar">
      <div
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            verticalAlign: "top",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              verticalAlign: "top",
              padding: "3px 5px",
            }}
          >
            <RxHeading />
          </div>
          <select className="ql-header" />
        </div>
        <div
          style={{
            display: "inline-flex",
            verticalAlign: "top",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              verticalAlign: "top",
              padding: "3px 5px",
            }}
          >
            <RxFontSize />
          </div>
          <select className="ql-size" />
        </div>
      </div>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <select className="ql-textUnderline" />
      <select className="ql-color" />
      <select className="ql-background" />
      <select className="ql-align" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
      <button className="ql-inlineCode">
        <BiCode />
      </button>
      <button className="ql-code-block" />
    </div>
  );
};
