import * as hljs from "highlight.js";
import "highlight.js/styles/base16/dracula.css";
import { Quill, QuillOptions } from "react-quill";
import { Quill as EditorQuill } from "quill";
import axios from "axios";

const editorRef: { editor?: EditorQuill } = {
  editor: undefined,
};

const handlers = {
  image() {
    const fileUpload = async (file: File) => {
      const getUploadURL = async () => {
        const directCreatorUploadFormData = new FormData();
        directCreatorUploadFormData.append("requireSignedURLs", "false");

        const directUploadUrl = (
          await axios.post(
            `/requestImageURL/client/v4/accounts/${process.env.REACT_APP_CLOUDIMAGE}/images/v2/direct_upload`,
            directCreatorUploadFormData,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_CLOUDIMAGE_TOKEN}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
        ).data;

        const { success, result } = directUploadUrl as {
          errors: any[];
          messages: any[];
          result: any;
          success: boolean;
        };

        return success
          ? { result: { url: result.uploadURL, imageID: result.id } }
          : { result: { url: "" } };
      };

      const uploadImage = async (uploadURL: string) => {
        uploadURL = uploadURL.replace("https://upload.imagedelivery.net/", "");
        const imageFormData = new FormData();
        imageFormData.append("file", file, file.name);

        const result = (
          await axios.post(`/imageUpload/${uploadURL}`, imageFormData, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_CLOUDIMAGE_TOKEN}`,
              "Content-Type": "multipart/form-data",
            },
          })
        ).data.result;

        const imageSrc = result.variants[0];

        return imageSrc ? { imageSrc } : { imageSrc: "" };
      };

      const { result } = await getUploadURL();

      if (!result.url) {
        console.log("cloudFlare error: [directCreatorUpload]");
        return { ok: false };
      }

      const { imageSrc } = await uploadImage(result.url);

      if (!imageSrc) {
        console.log("cloudFlare error: [uploadImage]");
        return { ok: false };
      }

      return { ok: true, imageSrc };
    };

    const input = document.createElement("input");
    input.onchange = async () => {
      const files = input.files;
      if (!files) return;

      Array.from(files).forEach(async (file) => {
        const { ok, imageSrc } = await fileUpload(file);
        if (ok) {
          const range = editorRef.editor?.getSelection()?.index;
          if (range === undefined) return;
          console.log({ imageSrc, range });
          editorRef.editor?.setSelection(range, 1, "user");
          editorRef.editor?.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${imageSrc} alt=${file.name} />`
          );
        }
      });
    };
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.click();
  },
};

// @ts-ignore
const highlightJS = hljs.HighlightJS as typeof hljs.default;
highlightJS.configure({ languages: ["javascript"] });

const editorModules: Pick<QuillOptions, "modules"> = {
  modules: {
    toolbar: {
      container: "#toolbar",
      handlers: { ...handlers },
    },
    syntax: {
      highlight: (text: string) => {
        const result = highlightJS.highlightAuto(text).value;
        return result;
      },
      interval: 500,
    },
  },
};

export const modules = (editor?: EditorQuill) => {
  editorRef.editor = editor;

  return editorModules.modules;
};
