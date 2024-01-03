"use client";

import React from "react";
import CodeMirror, { EditorView, ViewUpdate } from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { color } from "@uiw/codemirror-extensions-color";
import { githubDarkInit } from "@uiw/codemirror-theme-github";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  content: string;
  setContent: (content: string) => void;
};

export default function CodeEditor({ content, setContent }: Props) {
  const onChange = React.useCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      setContent(value);
    },
    [setContent]
  );

  return (
    <div className="w-full h-full">
      <ScrollArea className="h-full" orientation="vertical">
        <CodeMirror
          value={content}
          onChange={onChange}
          theme={githubDarkInit({
            settings: {
              background: "#020817",
              backgroundImage: "",
              foreground: "#ffffff",
              caret: "#ffffff",
              selection: "#1e293b",
              selectionMatch: "#1e293b",
              gutterBackground: "#020817",
              gutterForeground: "#94a3b8",
              gutterBorder: "#dddddd",
              gutterActiveForeground: "#ffffff",
              lineHighlight: "#1e293b55",
            },
          })}
          placeholder="Start writing your blog here..."
          basicSetup={{
            allowMultipleSelections: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            closeBracketsKeymap: true,
            completionKeymap: true,
            crosshairCursor: false,
            defaultKeymap: true,
            drawSelection: true,
            dropCursor: true,
            foldGutter: true,
            foldKeymap: true,
            highlightActiveLine: true,
            highlightActiveLineGutter: true,
            highlightSelectionMatches: true,
            highlightSpecialChars: true,
            history: true,
            historyKeymap: true,
            indentOnInput: true,
            lineNumbers: true,
            lintKeymap: true,
            rectangularSelection: false,
            searchKeymap: true,
            syntaxHighlighting: true,
            tabSize: 2,
          }}
          indentWithTab
          lang="markdown"
          extensions={[
            EditorView.lineWrapping,
            loadLanguage("markdown")!,
            color,
          ]}
        />
      </ScrollArea>
    </div>
  );
}
