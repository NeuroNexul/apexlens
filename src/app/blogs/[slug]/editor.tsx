"use client";

import React from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import PageLoader from "@/components/loaders/page_loader";
import { editor } from "monaco-editor";
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

    monaco.editor.defineTheme("slate-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#020817",
        "editor.foreground": "#ffffff",
        "editor.selectionBackground": "#1e293bab",
        "editor.lineHighlightBackground": "#1e293bab",
        "editorCursor.foreground": "#ffffff",
        "editorWhitespace.foreground": "#94a3b899",
      },
    });
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
        // onChange={(value) => setContent(value || "")}
        theme="slate-dark"
        loading={<PageLoader />}
        options={{
          "semanticHighlighting.enabled": true,
          minimap: { enabled: false },
          mouseWheelZoom: true,
        }}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
      />
    </div>
  );
}
