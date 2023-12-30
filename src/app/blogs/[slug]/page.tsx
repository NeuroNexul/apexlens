"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MetaData from "./meta_data";
import CodeEditor from "./editor";
import SplitView from "./split_view";
import Preview from "./preview";
import { Loader2, UploadCloud } from "lucide-react";

// const Preview = dynamic(() => import("./preview"), { ssr: false });

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    tab: string;
  };
};

export default function Page({
  params: { slug },
  searchParams: { tab },
}: Props) {
  const [content, setContent] =
    React.useState<string>(`# Just testing out [Code Hike](https://codehike.org/)

Some normal \`markdown\`

## Annotation Example
\`\`\`js index.js box=1[25:39]
console.log("Some code. I am annotated!")
\`\`\`

{/* Hello Comment */}

## Focus Example
\`\`\`js next.config.js focus=1:2,7
const { remarkCodeHike } = require("@code-hike/mdx");
const theme = require("shiki/themes/monokai.json");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[remarkCodeHike, { theme }]],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
\`\`\`

<section>
    ## Code Links Example

    We are looking at the [console.log](focus://console.js#2) function today

    <code>
        \`\`\`js console.js
        console.table(["Hello", "World"])
        console.log("Hello World")
        \`\`\`
    </code>
</section>`);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const tab_button_class = cn(
    "inline-flex items-center justify-center whitespace-nowrap gap-1", // Positioning
    "rounded-sm px-3 py-1 h-auto", // Size
    "text-sm font-medium", // Text
    "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus
    "disabled:pointer-events-none disabled:opacity-50 select-none", // State
    "border border-muted-foreground text-muted-foreground bg-transparent hover:bg-background hover:text-primary" // Variant
  );

  function save() {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  }

  React.useEffect(() => {
    function saveFunction(e: KeyboardEvent) {
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        save();
      }
    }

    window.addEventListener("keydown", saveFunction);

    return () => window.removeEventListener("keydown", saveFunction);
  }, []);

  return (
    <Tabs
      defaultValue={tab || "meta_data"}
      className="w-full h-[calc(100dvh-49px)] flex flex-col items-stretch justify-normal"
      onValueChange={(value) => {
        window.history.pushState({}, "", `/blogs/${slug}?tab=${value}`);
      }}
    >
      <div
        className={cn(
          "bg-muted block" // Background
        )}
      >
        <ScrollArea
          className="h-auto w-full"
          orientation="horizontal"
          width={4}
        >
          <div className="flex flex-row items-center justify-between p-1">
            <TabsList className={cn("rounded-none bg-transparent p-0 h-auto")}>
              <TabsTrigger value="meta_data">Meta Data</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="split_editor">Split Editor</TabsTrigger>
            </TabsList>

            <div className="flex-1 h-full border-l border-muted-foreground" />

            {/* Actions */}
            <div className="inline-flex flex-row items-center justify-between gap-1">
              <Button
                variant="outline"
                className={tab_button_class}
                size="sm"
                onClick={save}
              >
                {isSaving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <UploadCloud size={16} />
                )}
                Save
              </Button>
              {/* <Button variant="outline" className={tab_button_class} size="sm">
                Publish
              </Button> */}
              {/* <Button variant="outline" className={tab_button_class} size="sm">
                <LayoutTemplate size={16} />
                Preview
              </Button> */}
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 relative w-full h-full">
        <TabsContent value="meta_data" className="mt-0 h-full">
          <MetaData slug={slug} />
        </TabsContent>
        <TabsContent value="editor" className="mt-0 h-full">
          <CodeEditor slug={slug} content={content} setContent={setContent} />
        </TabsContent>
        <TabsContent value="preview" className="mt-0 h-full">
          <Preview slug={slug} content={content} />
        </TabsContent>
        <TabsContent value="split_editor" className="mt-0 h-full">
          <SplitView
            editor={
              <CodeEditor
                slug={slug}
                content={content}
                setContent={setContent}
              />
            }
            preview={<Preview slug={slug} content={content} />}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
