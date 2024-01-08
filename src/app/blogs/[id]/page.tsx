"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MetaData from "./meta_data";
import CodeEditor from "./editor";
import SplitView from "./split_view";
import Preview from "../../../mdx/preview";
import { Loader2, Trash2, UploadCloud, Wand2 } from "lucide-react";
import AppwriteClientService from "@/appwrite/client";
import { Models, Query } from "appwrite";
import { toast } from "sonner";
import prettier from "prettier/standalone";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    tab: string;
  };
};

export default function Page({ params: { id }, searchParams: { tab } }: Props) {
  const appwriteClient = React.useMemo(() => new AppwriteClientService(), []);

  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [content, setContent] = React.useState<string | null>(null);
  const [data, setData] = React.useState<Models.Document | null>(null);
  const [editorUpdate, setEditorUpdate] = React.useState<number>(0);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  const tab_button_class = cn(
    "inline-flex items-center justify-center whitespace-nowrap gap-1", // Positioning
    "rounded-sm px-3 py-1 h-auto", // Size
    "text-sm font-medium", // Text
    "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus
    "disabled:pointer-events-none disabled:opacity-50 select-none", // State
    "border border-muted-foreground text-muted-foreground bg-transparent hover:bg-background hover:text-primary" // Variant
  );

  const save = async () => {
    try {
      setIsSaving(true);
      setIsRefreshing(true);
      const newData = await appwriteClient.database.updateDocument(
        "production",
        "blogs",
        data?.$id || "",
        {
          content,
          description: data?.description || "",
          published: data?.published || false,
          reading_time: data?.reading_time || 0,
          slug: data?.slug || "",
          tags: data?.tags || [],
          thumbnail: data?.thumbnail || "",
          title: data?.title || "",
          view: data?.view || 0,
          view_ip: data?.view_ip || [],
        }
      );
      // Remove the local storage
      localStorage.removeItem(`blog-${id}`);
      // Set the new data
      setData(newData);
      setContent(newData.content);
      setIsSaving(false);
      setIsRefreshing(false);
      toast.success("Blog post saved successfully");
    } catch (e) {
      console.error(e);
      setIsSaving(false);
      setIsRefreshing(false);
      toast.error("Failed to save the blog post");
    }
  };

  function deleteLocalData() {
    localStorage.removeItem(`blog-${id}`);
    setIsRefreshing(true);
    loadData().then(() => {
      setEditorUpdate((prev) => prev + 1);
      setIsRefreshing(false);
    });
  }

  function saveFunction(e: KeyboardEvent) {
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      save();
    }
  }

  async function formatCode() {
    const newCode = await prettier.format(content || "", {
      parser: "markdown",
      plugins: [require("prettier/parser-markdown")],
    });
    setContent(newCode);
  }

  /**
   * Load the data from the server or local storage
   *
   * First, it will try to load the data from the local storage
   * If the data is not available in the localstorage or the data is invalid,
   * it will try to load the data from the server.
   */
  const loadData = React.useMemo(
    () => async () => {
      const localDataString = localStorage.getItem(`blog-${id}`) || null;
      let localData: Models.Document | null = null;

      try {
        localData = JSON.parse(localDataString || "");
      } catch (e) {
        console.log("Error Parsing Blog JSON; Fallback to server data");
      }

      if (localData === null) {
        const response = await appwriteClient.database.listDocuments(
          "production",
          "blogs",
          [Query.equal("$id", id)]
        );

        setData(response.documents[0]);
        setContent(response.documents[0].content);
      } else {
        setData(localData);
        setContent(localData?.content);
      }
    },
    [appwriteClient, id]
  );

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (content === null || data === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <Tabs
      defaultValue={tab || "meta_data"}
      className="w-full h-[calc(100dvh-49px)] flex flex-col items-stretch justify-normal"
      onValueChange={(value) => {
        window.history.pushState({}, "", `/blogs/${id}?tab=${value}`);
      }}
    >
      {/* Refresh Overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 z-10">
          <Loader2 size={48} className="animate-spin" />
        </div>
      )}
      <div
        className={cn(
          "bg-muted block shadow-2xl" // Background
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
                onClick={formatCode}
              >
                <Wand2 size={16} />
                Format
              </Button>
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
              <Button
                variant="outline"
                className={tab_button_class}
                size="sm"
                onClick={deleteLocalData}
              >
                <Trash2 size={16} />
                Delete Local Data
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 relative w-full h-[calc(100%-40px)]">
        <TabsContent value="meta_data" className="mt-0 h-full">
          <MetaData slug={id} data={data} setData={setData} />
        </TabsContent>
        <TabsContent value="editor" className="mt-0 h-full">
          <CodeEditor
            content={content}
            setContent={(content) => {
              localStorage.setItem(
                `blog-${id}`,
                JSON.stringify({
                  ...data,
                  content,
                })
              );

              setContent(content);
            }}
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-0 h-full">
          <Preview slug={id} content={content} />
        </TabsContent>
        <TabsContent value="split_editor" className="mt-0 h-full">
          <SplitView
            editor={
              <CodeEditor
                content={content}
                setContent={(content) => {
                  localStorage.setItem(
                    `blog-${id}`,
                    JSON.stringify({
                      ...data,
                      content,
                    })
                  );

                  setContent(content);
                }}
              />
            }
            preview={<Preview slug={id} content={content} />}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
