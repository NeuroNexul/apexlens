import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  code: string;
  css?: string;
};

const prismStyles = [
  {
    types: ["tag", "name", "quote"],
    style: {
      color: "#7ee787",
    },
  },
  {
    types: ["comment", "punctuation"],
    style: {
      color: "#8b949e",
    },
  },
  {
    types: ["class-name", "property-name"],
    style: {
      color: "#d2a8ff",
    },
  },
  {
    types: ["variable", "attr-name", "operator", "numbers"],
    style: {
      color: "#79c0ff",
    },
  },
  {
    types: ["keyword", "type", "operator", "attr-equals"],
    style: {
      color: "#ff7b72",
    },
  },
  {
    types: ["string", "meta", "regexp", "attr-value"],
    style: {
      color: "#a5d6ff",
    },
  },
  {
    types: ["headings", "strong"],
    style: {
      color: "#d2a8ff",
      fontWeight: "bold",
    },
  },
  {
    types: ["emphasis"],
    style: {
      color: "#d2a8ff",
      fontStyle: "italic",
    },
  },
  {
    types: ["deleted"],
    style: {
      color: "#ffdcd7",
      backgroundColor: "ffeef0",
    },
  },
  {
    types: ["atom", "boolean"],
    style: {
      color: "#ffab70",
    },
  },
  {
    types: ["link"],
    style: {
      textDecorationLine: "underline",
    },
  },
  {
    types: ["strike-through"],
    style: {
      textDecorationLine: "line-through",
    },
  },
  {
    types: ["invalid"],
    style: {
      color: "#f97583",
    },
  },
];

export default function LiveReact({ code }: Props) {
  return (
    <div className="border rounded-md overflow-hidden h-auto mt-2 mb-4">
      {/* Header */}
      <div className="w-full bg-muted flex flex-row items-center justify-normal">
        <h2 className="text-sm font-bold text-muted-foreground p-2">
          React Playground
        </h2>
      </div>
      <LiveProvider
        code={code}
        enableTypeScript={true}
        theme={{
          plain: {
            color: "#FFFFFF",
            backgroundColor: "#020817",
            background: "#020817",
            backgroundImage: "",
            cursor: "#ffffff",
            fontStyle: "normal",
            fontWeight: "400",
            opacity: 1,
            textDecorationLine: "none",
            textShadow: "",
          },
          styles: [],
        }}
      >
        <ResizablePanelGroup direction="horizontal" className="max-h-96">
          <ResizablePanel>
            <LiveEditor />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <ScrollArea className="h-full p-2" orientation="both">
              <LiveError />
              <LivePreview />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </LiveProvider>
    </div>
  );
}
