"use client";

import { Monaco } from "@monaco-editor/react";
import { LanguageService } from "@volar/language-service";
import * as VolarMonaco from "@volar/monaco";
import { editor } from "monaco-editor";

export default function registerMdxLanguage(monaco: Monaco) {
  // Register a new language
  monaco.languages.register({ id: "mdx", extensions: [".mdx"] });
  monaco.languages.onLanguage("mdx", () => {
    const worker = editor.createWebWorker<LanguageService>({
      moduleId: "vs/language/mdx/langWorker",
      label: "mdx",
    });
    VolarMonaco.editor.activateMarkers(
      worker,
      ["mdx"],
      "mdx-markers-owner",
      // sync files
      () => [],
      editor
    );
    VolarMonaco.languages.registerProviders(
      worker,
      ["mdx"],
      () => [],
      monaco.languages
    );
  });
}
