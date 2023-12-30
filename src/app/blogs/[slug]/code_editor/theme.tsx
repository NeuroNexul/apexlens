import { Monaco } from "@monaco-editor/react";
import chroma from "chroma-js";
import darkColors from "@primer/primitives/dist/json/colors/dark.json";
import { editor } from "monaco-editor";

export function defineTheme(monaco: Monaco, theme: "dark" | "light") {
  const color = changeColorToHexAlphas(darkColors);
  const scale = color.scale;

  const lightDark = (light: string, dark: string) => {
    return theme === "dark" ? dark : light;
  };

  monaco.editor.defineTheme("slate-dark", {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.background": "#020817",
      "editor.foreground": "#ffffff",
      "editor.selectionBackground": "#1e293bab",
      "editor.lineHighlightBackground": "#1e293bab",
      "editorCursor.foreground": "#ffffff",
      "editorWhitespace.foreground": "#94a3b899",
      "editorSuggestWidget.background": "#020817",
      "editorSuggestWidget.border": "#1e293b",
      "editorSuggestWidget.foreground": "#ffffff",
      "editorSuggestWidget.selectedBackground": "#1e293b",
      "editorSuggestWidget.highlightForeground": "#ffffff",
      "editorIndentGuide.background": "#ff0000",
      "editorLineNumber.foreground": "#94a3b8",
      "dropdown.background": "#020817",
      "dropdown.foreground": "#ffffff",
      "dropdown.border": "#1e293b",
      "badge.background": "#020817",
      "badge.foreground": "#1e293b",

      // Lists
      "list.focusBackground": "#020817",
      "list.focusForeground": "#ffffff",
      "list.activeSelectionBackground": "#1e293b",
      "list.activeSelectionForeground": "#ffffff",
      "list.inactiveSelectionBackground": "#020817",
      "list.inactiveSelectionForeground": "#ffffff",
      "list.hoverBackground": "#1e293b",
      "list.hoverForeground": "#ffffff",
      "list.dropBackground": "#020817",
      "list.highlightForeground": "#ffffff",

      // Widget
      "editorWidget.background": "#020817",
      "editorWidget.border": "#1e293b",

      // Inputs
      "input.background": "#1e293b",
      "input.foreground": "#94a3b8",
      "input.border": "#1e293b",
      "inputOption.activeBorder": "",
      "input.placeholderForeground": "#94a3b899",
      "inputValidation.infoBackground": "#020817",
      "inputValidation.infoBorder": "#1e293b",
      "inputValidation.warningBackground": "#7f1d1d",
      "inputValidation.warningBorder": "#f8fafc",
      "inputValidation.errorBackground": "#7f1d1d",
      "inputValidation.errorBorder": "#f8fafc",

      "editor.wordHighlightBackground": "#1e293bab",
      "editor.wordHighlightStrongBackground": "#1e293bab",
    },
    rules: [
      {
        token: ["comment", "punctuation.definition.comment", "string.comment"],
        foreground: lightDark(scale.gray[5], scale.gray[3]),
      },
      {
        token: ["constant.other.placeholder", "constant.character"],
        foreground: lightDark(scale.red[5], scale.red[3]),
      },
      {
        token: [
          "constant",
          "entity.name.constant",
          "variable.other.constant",
          "variable.other.enummember",
          "variable.language",
          "entity",
        ],
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: [
          "entity.name",
          "meta.export.default",
          "meta.definition.variable",
        ],
        foreground: lightDark(scale.orange[6], scale.orange[2]),
      },
      {
        token: [
          "variable.parameter.function",
          "meta.jsx.children",
          "meta.block",
          "meta.tag.attributes",
          "entity.name.constant",
          "meta.object.member",
          "meta.embedded.expression",
        ],
        foreground: color.fg.default,
      },
      {
        token: "entity.name.function",
        foreground: lightDark(scale.purple[5], scale.purple[2]),
      },
      {
        token: ["entity.name.tag", "support.class.component"],
        foreground: lightDark(scale.green[6], scale.green[1]),
      },
      {
        token: "keyword",
        foreground: lightDark(scale.red[5], scale.red[3]),
      },
      {
        token: ["storage", "storage.type"],
        foreground: lightDark(scale.red[5], scale.red[3]),
      },
      {
        token: [
          "storage.modifier.package",
          "storage.modifier.import",
          "storage.type.java",
        ],
        foreground: color.fg.default,
      },
      {
        token: ["string", "string punctuation.section.embedded source"],
        foreground: lightDark(scale.blue[8], scale.blue[1]),
      },
      {
        token: "support",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "meta.property-name",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "variable",
        foreground: lightDark(scale.orange[6], scale.orange[2]),
      },
      {
        token: "variable.other",
        foreground: color.fg.default,
      },
      {
        token: "invalid.broken",
        fontStyle: "italic",
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: "invalid.deprecated",
        fontStyle: "italic",
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: "invalid.illegal",
        fontStyle: "italic",
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: "invalid.unimplemented",
        fontStyle: "italic",
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: "carriage-return",
        fontStyle: "italic underline",
        background: lightDark(scale.red[5], scale.red[3]),
        foreground: lightDark(scale.gray[0], scale.gray[0]),
        content: "^M",
      },
      {
        token: "message.error",
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: "string variable",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: ["source.regexp", "string.regexp"],
        foreground: lightDark(scale.blue[8], scale.blue[1]),
      },
      {
        token: [
          "string.regexp.character-class",
          "string.regexp constant.character.escape",
          "string.regexp source.ruby.embedded",
          "string.regexp string.regexp.arbitrary-repitition",
        ],
        foreground: lightDark(scale.blue[8], scale.blue[1]),
      },
      {
        token: "string.regexp constant.character.escape",
        fontStyle: "bold",
        foreground: lightDark(scale.green[6], scale.green[1]),
      },
      {
        token: "support.constant",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "support.variable",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "support.type.property-name.json",
        foreground: lightDark(scale.green[6], scale.green[1]),
      },
      {
        token: "meta.module-reference",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "punctuation.definition.list.begin.markdown",
        foreground: lightDark(scale.orange[6], scale.orange[2]),
      },
      {
        token: ["markup.heading", "markup.heading entity.name"],
        fontStyle: "bold",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "markup.quote",
        foreground: lightDark(scale.green[6], scale.green[1]),
      },
      {
        token: "markup.italic",
        fontStyle: "italic",
        foreground: color.fg.default,
      },
      {
        token: "markup.bold",
        fontStyle: "bold",
        foreground: color.fg.default,
      },
      {
        token: ["markup.underline"],
        fontStyle: "underline",
      },
      {
        token: ["markup.strikethrough"],
        fontStyle: "strikethrough",
      },
      {
        token: "markup.inline.raw",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: [
          "markup.deleted",
          "meta.diff.header.from-file",
          "punctuation.definition.deleted",
        ],
        background: lightDark(scale.red[0], scale.red[9]),
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: ["punctuation.section.embedded"],
        foreground: lightDark(scale.red[5], scale.red[3]),
      },
      {
        token: [
          "markup.inserted",
          "meta.diff.header.to-file",
          "punctuation.definition.inserted",
        ],
        background: lightDark(scale.green[0], scale.green[9]),
        foreground: lightDark(scale.green[6], scale.green[1]),
      },
      {
        token: ["markup.changed", "punctuation.definition.changed"],
        background: lightDark(scale.orange[1], scale.orange[8]),
        foreground: lightDark(scale.orange[6], scale.orange[2]),
      },
      {
        token: ["markup.ignored", "markup.untracked"],
        foreground: lightDark(scale.gray[1], scale.gray[8]),
        background: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "meta.diff.range",
        foreground: lightDark(scale.purple[5], scale.purple[2]),
        fontStyle: "bold",
      },
      {
        token: "meta.diff.header",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "meta.separator",
        fontStyle: "bold",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: "meta.output",
        foreground: lightDark(scale.blue[6], scale.blue[2]),
      },
      {
        token: [
          "brackethighlighter.tag",
          "brackethighlighter.curly",
          "brackethighlighter.round",
          "brackethighlighter.square",
          "brackethighlighter.angle",
          "brackethighlighter.quote",
        ],
        foreground: lightDark(scale.gray[6], scale.gray[3]),
      },
      {
        token: "brackethighlighter.unmatched",
        foreground: lightDark(scale.red[7], scale.red[2]),
      },
      {
        token: ["constant.other.reference.link", "string.other.link"],
        foreground: lightDark(scale.blue[8], scale.blue[1]),
      },
    ]
      .map(
        (rule: {
          token: string | string[];
          foreground?: string;
          background?: string;
          fontStyle?: string;
        }) => {
          // Make indevidual rules for each token
          const { token, ...rest } = rule;
          if (typeof token === "string") return rule;

          const newRules = [];

          for (const t of token) {
            newRules.push({
              token: t,
              ...rest,
            });
          }

          return newRules;
        }
      )
      .flat() as editor.ITokenThemeRule[],
  });
}

// Convert to hex
// VS Code doesn't support other formats like hsl, rgba etc.

function changeColorToHexAlphas(obj: any) {
  if (typeof obj === "object") {
    for (var keys in obj) {
      if (typeof obj[keys] === "object") {
        changeColorToHexAlphas(obj[keys]);
      } else {
        let keyValue = obj[keys];
        if (chroma.valid(keyValue)) {
          obj[keys] = chroma(keyValue).hex();
        }
      }
    }
  }
  return obj;
}
