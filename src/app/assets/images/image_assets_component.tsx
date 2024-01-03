"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImagesRecord, getXataClient } from "@/lib/xata";
import { ColumnsByValue, JSONData, Page, SelectedPick } from "@xata.io/client";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, stringifyBytes } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  ExternalLink,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ImageUploadPreset from "./image_upload_preset";
import formatDate from "@/lib/date";
import { toast } from "sonner";
import Link from "next/link";

const xata = getXataClient();

const tab_button_class = cn(
  "inline-flex items-center justify-center whitespace-nowrap gap-1", // Positioning
  "rounded-sm px-3 py-1 h-auto", // Size
  "text-sm font-medium", // Text
  "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Focus
  "disabled:pointer-events-none disabled:opacity-50 select-none", // State
  "border border-muted-foreground text-muted-foreground bg-transparent hover:bg-background hover:text-primary" // Variant
);

type XataRecordMetadata = {
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

type QueryState = {
  sort: {
    key: ColumnsByValue<ImagesRecord, any> | `xata.${keyof XataRecordMetadata}`;
    order: "asc" | "desc";
  };
  pagination?: {
    size: number;
    cursor?: string;
  };
};

type Props = {
  className?: string;
};

export function ImageAssetsComponent({ className }: Props) {
  // XATA ITERATOR
  const xataIterater = React.useRef<Page<
    ImagesRecord,
    Readonly<SelectedPick<ImagesRecord, ["*"]>>
  > | null>(null);

  const [data, setData] = React.useState<JSONData<ImagesRecord>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [picked, setPicked] = React.useState<
    | (JSONData<ImagesRecord> & {
        edited: boolean;
      })
    | null
  >(null);

  const [queryState, setQueryState] = React.useState<QueryState>({
    sort: {
      key: "xata.createdAt",
      order: "desc",
    },
    pagination: {
      size: 20,
      cursor: undefined,
    },
  });

  const refreshData = React.useMemo(
    () => () => {
      setLoading(true);
      xata.db.images
        .sort(queryState.sort.key, queryState.sort.order)
        .getAll()
        .then((res) => {
          setData(res.map((r) => r.toSerializable()));
          setLoading(false);
        });
      return;
    },
    [queryState]
  );

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <ImageUploadPreset refresh={refreshData} className={className}>
      {/* Top Bar */}
      <div className="bg-muted block shadow-2xl">
        <ScrollArea
          className="h-auto w-full"
          orientation="horizontal"
          width={4}
        >
          <div className="flex flex-row items-center justify-between p-1 gap-1">
            <div className="flex-1" />
            <Button
              className={tab_button_class}
              variant="default"
              onClick={() => {
                document.getElementById("uploadFileInput")?.click();
              }}
            >
              <UploadCloud size={16} />
              <span>Upload</span>
            </Button>
            <Button
              className={tab_button_class}
              variant="default"
              onClick={refreshData}
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="w-full h-[calc(100%-39px-38px)] select-none @container">
        <ScrollArea className="h-full w-full" orientation="vertical" width={8}>
          <div className="grid gap-4 p-4 [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] @sm:[grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] @lg:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
            {loading
              ? Array.from(Array(10).keys()).map((i) => {
                  return (
                    <div
                      className={cn(
                        "relative z-0 aspect-square lg:aspect-video w-full", // Positioning, Size
                        "rounded-md overflow-hidden", // Border
                        "cursor-pointer", // Cursor
                        "bg-muted" // Background
                      )}
                      key={i}
                    >
                      <Skeleton className="w-full h-full" />
                    </div>
                  );
                })
              : data.map((d) => {
                  const src = (d.url as string).replace(
                    /(https:\/\/res\.cloudinary\.com\/di9pwtpmy\/image\/upload\/)(.*)/,
                    "$1w_340/$2"
                  );

                  return (
                    <div
                      className={cn(
                        "relative z-0 aspect-square lg:aspect-video w-full", // Positioning, Size
                        "rounded-md overflow-hidden border", // Border
                        "cursor-pointer", // Cursor
                        "bg-muted" // Background
                      )}
                      key={d.id}
                      onClick={() => {
                        setPicked({
                          ...d,
                          edited: false,
                        });
                      }}
                    >
                      <Image
                        src={src}
                        alt={d.filename as string}
                        width={340}
                        height={192}
                        className="object-cover w-full h-full"
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
                          <div
                            className={cn(
                              "top opacity-0 group-hover:opacity-100",
                              "transition-all duration-500",
                              "transform -translate-y-full group-hover:translate-y-0"
                            )}
                          >
                            <div className="flex flex-row items-center justify-between gap-2">
                              <div className="flex-1"></div>
                              <Link
                                href={d.url as string}
                                target="_blank"
                                className="p-2 rounded-full transition-colors hover:bg-muted"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={16} />
                              </Link>
                            </div>
                          </div>
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
                            <p className="truncate text-muted-foreground text-left text-sm">
                              {d.alt as string}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Bar */}
      <div className="bg-muted/60 block shadow-2xl">
        <div className="flex flex-row items-center justify-between p-1 gap-1">
          <p className="text-sm text-muted-foreground">
            Total {data.length} assets found.
          </p>
          <div className="flex-1" />
          <Button className={tab_button_class} variant="default">
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>
          <Button className={tab_button_class} variant="default">
            <ChevronRight size={16} />
            <span>Previous</span>
          </Button>
        </div>
      </div>

      {/* Picked Item View */}
      {picked && (
        <div
          className={cn(
            "absolute w-full h-full top-0 left-0 z-20", // Positioning
            "grid place-items-center p-8 md:p-20", // Container
            "bg-background/70 supports-[backdrop-filter]:bg-background/40 backdrop-blur-[2px]" // Background
          )}
          onClick={() => {
            setPicked(null);
          }}
        >
          <div
            className={cn(
              "w-full h-full max-w-4xl", // Size
              "bg-background border rounded-md overflow-hidden", // Border
              "shadow-2xl" // Shadow
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b flex flex-row items-center justify-between gap-2 py-1 px-4">
              <h2 className="text-center text-lg font-medium">Asset Details</h2>
              <Button variant="ghost" onClick={() => setPicked(null)}>
                <X size={16} />
              </Button>
            </div>

            <div className="w-full h-[calc(100%-49px)]">
              <ScrollArea className="w-full h-full" orientation="vertical">
                <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-2 w-full">
                  <div className="relative aspect-square w-full border rounded-md overflow-hidden">
                    <Image
                      src={picked.url as string}
                      alt={picked.filename as string}
                      width={340}
                      height={192}
                      className="object-contain w-full h-full pointer-events-none select-none"
                    />
                    <div className="absolute w-full h-full top-0 left-0" />
                  </div>
                  <div className="w-full">
                    <div className="border rounded-md">
                      <ScrollArea className="w-full" orientation="horizontal">
                        <table className="w-full">
                          <tbody className="group">
                            {[
                              {
                                label: "File Name",
                                id: "filename",
                                value: picked.filename as string,
                                editable: true,
                              },
                              {
                                label: "Alt Text",
                                id: "alt",
                                value: picked.alt as string,
                                editable: true,
                              },
                              {
                                label: "Categories",
                                id: "categories",
                                // !TODO: Add categories
                                component: (
                                  <div className="px-2 text-muted-foreground">
                                    Yet to do...
                                  </div>
                                ),
                              },
                              {
                                label: "Extension",
                                value:
                                  (picked.extension as string) ||
                                  (picked.format as string) ||
                                  "N/A",
                              },
                              {
                                label: "MIME Type",
                                value:
                                  `Image/${picked.format as string}` || "N/A",
                              },
                              {
                                label: "Dimensions",
                                value: `${picked.width as number}x${
                                  picked.height as number
                                }px`,
                              },
                              {
                                label: "File Size",
                                value: `${stringifyBytes(
                                  picked.bytes as number
                                )} (${picked.bytes as number} bytes)`,
                              },
                              {
                                label: "Created At",
                                value: formatDate(
                                  new Date(picked.xata.createdAt as string),
                                  "$dd $MMM $yyyy, $HH:$mm:$ss, $K"
                                ),
                              },
                              {
                                label: "Updated At",
                                value: formatDate(
                                  new Date(picked.xata.updatedAt as string),
                                  "$dd $MMM, $yyyy, $HH:$mm:$ss, $K"
                                ),
                              },
                            ].map((item) => (
                              <tr
                                key={item.label}
                                className="border-b whitespace-nowrap last-of-type:border-b-0"
                              >
                                <td className="px-2 py-1 border-r text-sm text-muted-foreground">
                                  {item.label}:&nbsp;
                                </td>
                                <td
                                  className={cn(
                                    "text-sm font-medium p-0",
                                    !item.component &&
                                      !item.editable &&
                                      "px-2 py-1"
                                  )}
                                >
                                  {!item.component ? (
                                    item.editable ? (
                                      <input
                                        type="text"
                                        className="w-full h-full border-none bg-transparent text-sm font-medium p-0 px-2 active:outline-none focus:outline-none focus-visible:outline-none"
                                        value={item.value}
                                        onChange={(e) => {
                                          setPicked({
                                            ...picked,
                                            [item.id]: e.target.value,
                                            edited: true,
                                          });
                                        }}
                                      />
                                    ) : (
                                      item.value
                                    )
                                  ) : (
                                    item.component
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </ScrollArea>
                    </div>
                    <div className="border rounded-md mt-2">
                      <ScrollArea className="w-full" orientation="horizontal">
                        <table className="w-full mb-2.5">
                          <tbody className="group">
                            {[
                              {
                                label: "ID",
                                value: picked.id as string,
                              },
                              {
                                label: "Public ID",
                                value: picked.public_id as string,
                              },
                              {
                                label: "Asset ID",
                                value: picked.asset_id as string,
                              },
                              {
                                label: "Signature",
                                value: picked.signature as string,
                              },
                              {
                                label: "Secure URL",
                                value: picked.url as string,
                                clipboard: true,
                              },
                            ].map((item) => (
                              <tr
                                key={item.label}
                                className={cn(
                                  "border-b whitespace-nowrap last-of-type:border-b-0 transition-colors duration-200",
                                  item.clipboard &&
                                    "cursor-pointer hover:bg-muted/50"
                                )}
                                onClick={() => {
                                  if (item.clipboard) {
                                    navigator.clipboard.writeText(
                                      item.value as string
                                    );
                                    toast.success("Copied to clipboard!", {
                                      description: item.value as string,
                                    });
                                  }
                                }}
                              >
                                <td className="px-2 py-1 border-r text-sm text-muted-foreground flex flex-row gap-2">
                                  {item.clipboard && (
                                    <ClipboardCopy size={16} />
                                  )}
                                  {item.label}:&nbsp;
                                </td>
                                <td className="px-2 py-1 text-sm font-medium">
                                  {item.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </ScrollArea>
                    </div>
                    <div>
                      <Button
                        className="w-full mt-2 gap-2"
                        variant="outline"
                        size="sm"
                        disabled={!picked.edited}
                        onClick={() => {
                          xata.db.images
                            .update(picked.id, {
                              filename: picked.filename as string,
                              alt: picked.alt as string,
                            })
                            .then(() => {
                              setPicked(null);
                              refreshData();
                              toast.success("Asset updated successfully!");
                            })
                            .catch((err) => {
                              toast.error(err.message);
                            });
                        }}
                      >
                        <UploadCloud size={16} />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </ImageUploadPreset>
  );
}
