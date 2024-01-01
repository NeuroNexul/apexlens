"use client";

import React, { useEffect } from "react";
import ImageUploadModal from "./image_upload_modal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagesRecord, getXataClient } from "@/lib/xata";
import { JSONData, Page, SelectedPick } from "@xata.io/client";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";

const xata = getXataClient();

const tab_button_class = cn(
  "inline-flex items-center justify-center whitespace-nowrap gap-1", // Positioning
  "rounded-sm px-3 py-1 h-auto", // Size
  "text-sm font-medium", // Text
  "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus
  "disabled:pointer-events-none disabled:opacity-50 select-none", // State
  "border border-muted-foreground text-muted-foreground bg-transparent hover:bg-background hover:text-primary" // Variant
);

type Props = {};

export default function ImagePage({}: Props) {
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);
  const [data, setData] = React.useState<JSONData<ImagesRecord>[]>([]);
  const xataIterater = React.useRef<Page<
    ImagesRecord,
    Readonly<SelectedPick<ImagesRecord, ["*"]>>
  > | null>(null);

  useEffect(() => {
    xata.db.images.getPaginated().then((res) => {
      xataIterater.current = res;
      setData(res.records.toSerializable());
    });
  }, []);

  return (
    <div className="w-full h-full">
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
            <Dialog
              open={uploadModalOpen}
              onOpenChange={(open) => setUploadModalOpen(open)}
            >
              <DialogTrigger asChild onClick={() => setUploadModalOpen(true)}>
                <Button
                  variant="default"
                  size="sm"
                  className={tab_button_class}
                >
                  <UploadCloud size={16} />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg p-0">
                <ImageUploadModal
                  close={() => {
                    setUploadModalOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </ScrollArea>
      </div>

      <div className="w-full h-[calc(100%-39px)]">
        <ScrollArea className="h-full w-full" orientation="vertical" width={8}>
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
            {data.map((d) => {
              const src = (d.url as string).replace(
                /(https:\/\/res\.cloudinary\.com\/di9pwtpmy\/image\/upload\/)(.*)/,
                "$1w_340/$2"
              );

              return (
                <div
                  className={cn(
                    "relative z-0 aspect-video min-w-[250px]", // Positioning, Size
                    "rounded-md overflow-hidden", // Border
                    "cursor-pointer", // Cursor
                    "bg-muted" // Background
                  )}
                  key={d.id}
                  onClick={() => {
                    console.log("[IMAGE] => ", d);
                  }}
                >
                  <Image
                    src={src}
                    alt={d.filename as string}
                    width={340}
                    height={192}
                    className="object-cover aspect-video w-full h-full"
                  />

                  <div
                    className={cn(
                      "group absolute top-0 left-0 w-full h-full z-10", // Positioning
                      "bg-[linear-gradient(0deg,rgba(0,0,0,0.9)0%,rgba(0,0,0,0)100%)] [background-size:100%_200%] bg-top hover:bg-bottom", // Background
                      "transition-all duration-500" // Transition
                    )}
                  >
                    <div
                      className={cn(
                        "w-full h-full flex flex-col items-stretch justify-between gap-2 p-4" // Positioning
                      )}
                    >
                      <div className={cn("top")}></div>
                      <div
                        className={cn(
                          "bottom opacity-0 group-hover:opacity-100",
                          "transition-all duration-500",
                          "transform translate-y-full group-hover:translate-y-0"
                        )}
                      >
                        <h2 className="truncate text-white text-left font-semibold text-base">
                          {d.filename as string}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
