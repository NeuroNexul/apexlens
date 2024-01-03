"use client";

import React from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import PageLoader from "@/components/loaders/page_loader";
import { editor } from "monaco-editor";
import { defineTheme } from "./code_editor/theme";
// @ts-ignore
// import monacoThemes from "monaco-themes/themes/themelist";

type Props = {
  slug: string;
  content: string;
  setContent: (content: string) => void;
};

export default function CodeEditor({ slug, content, setContent }: Props) {
  const editorRef = React.useRef<any>(null);
  // console.log("monacoThemes", monacoThemes);

  function handleEditorWillMount(monaco: Monaco) {
    console.log("Monaco editor mounting.");

    defineTheme(monaco, "dark"); // Define the dark theme
    // registerMdxLanguage(monaco); // Register the mdx language
  }

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    console.log("Monaco editor mounted.");
    editorRef.current = editor;
  }

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        defaultLanguage="mdx"
        defaultValue={content}
        onChange={(value) => setContent(value || "")}
        theme="slate-dark"
        loading={<PageLoader />}
        options={{
          "semanticHighlighting.enabled": true,
          minimap: { enabled: false },
          mouseWheelZoom: true,
          fontSize: 12,
          wordWrap: "on",

          // Automatic Layout
          automaticLayout: true,
          autoClosingBrackets: "beforeWhitespace",
          autoClosingQuotes: "beforeWhitespace",
          autoClosingComments: "beforeWhitespace",
          autoIndent: "advanced",
          bracketPairColorization: {
            enabled: true,
          },
          smoothScrolling: true,
        }}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
      />
    </div>
  );
}
