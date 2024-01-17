"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type Props = {
  defaultSize?: number;
  css?: string;
  children: React.ReactNode;
};

export default function LiveReact({ defaultSize, children }: Props) {
  const rawCode = React.isValidElement(children)
    ? (children.props as any).children.props.children.trim()
    : "";

  const [code, setCodde] = React.useState(rawCode);

  // const format = () => {
  //   const formatted = prettier
  //     .format(code, {
  //       parser: "babel",
  //       plugins: [require("prettier/parser-babel")],
  //     })
  //     .then((formatted) => setCodde(formatted));
  // };

  return (
    <div className="border rounded-md overflow-hidden h-auto mt-2 mb-4">
      {/* Header */}
      <div className="w-full bg-muted flex flex-row items-center justify-normal">
        <h2 className="text-sm font-bold text-muted-foreground p-2">
          React Playground
        </h2>
        <div className="flex-grow"></div>
        {/* <div className="h-full w-auto flex flex-row items-center gap-2 px-2">
          <Button
            size="icon"
            variant="ghost"
            className="p-1 h-full w-auto aspect-square text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out"
            title="Format code"
            onClick={format}
          >
            <Wand2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="p-1 h-full w-auto aspect-square text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out"
            title="Reset code"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
        </div> */}
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
          <ResizablePanel defaultSize={defaultSize || 50}>
            {/* Editor */}
            <ScrollArea className="h-full p-1" orientation="both">
              <LiveEditor code={code} onChange={(code) => setCodde(code)} />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            {/* Preview */}
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
