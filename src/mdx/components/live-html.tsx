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
import { RefreshCw, SkipBack, Wand2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  code: string;
  defaultSize?: number;
  css?: string;
};

export default function LiveReact({ code: c, defaultSize }: Props) {
  const [code, setCode] = React.useState({
    react: c,
    style: "",
  });

  return (
    <div className="border rounded-md overflow-hidden h-auto mt-2 mb-4">
      {/* Header */}
      <div className="w-full bg-muted flex flex-row items-center justify-normal">
        <h2 className="text-sm font-bold text-muted-foreground p-2">
          React Playground
        </h2>
        <div className="flex-grow"></div>
        <div className="h-full w-auto flex flex-row items-center gap-2 px-2">
          <Button
            size="icon"
            variant="ghost"
            className="p-1 h-full w-auto aspect-square text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out"
            title="Format code"
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
        </div>
      </div>
      <LiveProvider
        // code={code}
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
            {/* Header */}
            <Tabs defaultValue="react" className="w-full">
              <div className="w-full h-8 bg-muted/40 flex flex-row items-center justify-normal">
                <TabsList className="p-0 bg-transparent">
                  <TabsTrigger
                    value="react"
                    className="text-sm font-medium text-muted-foreground rounded-none"
                  >
                    React
                  </TabsTrigger>
                  <TabsTrigger
                    value="style"
                    className="text-sm font-medium text-muted-foreground rounded-none"
                  >
                    Style
                  </TabsTrigger>
                </TabsList>
              </div>
              {/* Editor */}
              <ScrollArea
                className="h-[calc(100%-32px)] p-2"
                orientation="both"
              >
                <TabsContent value="react">
                  <LiveEditor
                    code={code.react}
                    language="tsx"
                    onChange={(c) => setCode({ ...code, react: c })}
                    tabMode="indentation"
                  />
                </TabsContent>
                <TabsContent value="style">
                  <LiveEditor
                    code={code.style}
                    language="css"
                    onChange={(c) => setCode({ ...code, style: c })}
                    tabMode="indentation"
                  />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            {/* Header */}
            <div className="w-full h-8 bg-muted/40 flex flex-row items-center justify-normal">
              <h2 className="text-sm font-bold text-muted-foreground px-2 py-1">
                Live Preview
              </h2>
              <div className="flex-grow"></div>
              <div className="h-full w-auto flex flex-row items-center gap-2 px-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="p-1 h-full w-auto aspect-square text-muted-foreground bg-transparent hover:bg-transparent hover:text-primary transition-colors duration-200 ease-in-out"
                  title="Refresh preview"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Preview */}
            <ScrollArea className="h-[calc(100%-32px)] p-2" orientation="both">
              <LiveError />
              <LivePreview />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </LiveProvider>
    </div>
  );
}
