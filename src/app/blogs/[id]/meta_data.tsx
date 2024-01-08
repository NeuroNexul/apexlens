import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import formatDate from "@/lib/date";
import { cn, slugify } from "@/lib/utils";
import { Models } from "appwrite";
import Image from "next/image";
import React from "react";

type Props = {
  slug: string;
  data: Models.Document;
  setData: React.Dispatch<React.SetStateAction<Models.Document | null>>;
};

export default function MetaData({ slug, data, setData }: Props) {
  return (
    <div className="w-full h-full bg-background">
      <ScrollArea className="w-full h-full" orientation="vertical">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Editor */}
          <div className="w-full h-auto py-4 px-4">
            <div className="border-b mb-4">
              <h2 className="text-2xl font-semibold font-noto_serif_georgian">
                Meta Data
              </h2>
              <p className="text-sm text-muted-foreground">
                Meta data of this blog post. This data is used for SEO.
              </p>
            </div>

            {/* Title */}
            <div className="w-full pb-4">
              <Label htmlFor="title">Title of this blog post:</Label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={data?.title || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    title: e.target.value,
                    slug: slugify(e.target.value),
                  })
                }
                className="mt-1"
              />
              <p className="text-right text-xs pt-1 text-muted-foreground">
                Length {data.title.length}/60 characters
              </p>
            </div>

            {/* Slug */}
            <div className="w-full pb-4">
              <Label htmlFor="slug">Slug of this blog post:</Label>
              <Input
                type="text"
                name="slug"
                placeholder="Slug"
                disabled
                value={data?.slug}
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div className="w-full pb-4">
              <Label htmlFor="description">
                Description of this blog post:
              </Label>
              <textarea
                name="description"
                placeholder="Description"
                value={data?.description || ""}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                rows={6}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 mt-1 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-right text-xs pt-1 text-muted-foreground">
                Length {data.description.length}/150 characters
              </p>
            </div>

            {/* Is Published */}
            <div className="w-full p-4 mb-4 flex flex-row items-center gap-1 border rounded-md">
              <Label htmlFor="published">Is published?</Label>
              <Checkbox
                name="published"
                checked={data?.published || false}
                onCheckedChange={(e) => setData({ ...data, published: e })}
              />
            </div>

            {/* Thumbnail */}
            <div className="w-full pb-4">
              <Label htmlFor="thumbnail">Thumbnail of this blog post:</Label>
              <Input
                type="text"
                name="thumbnail"
                placeholder="Thumbnail"
                value={data?.thumbnail || ""}
                onChange={(e) =>
                  setData({ ...data, thumbnail: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {/* Tags */}
            <div className="w-full pb-4">
              <Label htmlFor="tags">Tags of this blog post:</Label>
              <Input
                type="text"
                name="tags"
                placeholder="Tags"
                defaultValue={data?.tags.join(", ") || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    tags: e.target.value.split(",").map((e) => e.trim()),
                  })
                }
                className="mt-1"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="w-full h-auto px-4 py-4">
            <div className="border-b mb-4">
              <h2 className="text-2xl font-semibold font-noto_serif_georgian">
                Preview
              </h2>
              <p className="text-sm text-muted-foreground">
                Preview of this blog post. Google search, Facebook, Twitter and
                other social media platforms use this data.
              </p>
            </div>

            {/* Google Search */}
            <div className="w-full">
              <h3 className="text-lg font-medium text-muted-foreground font-noto_serif_georgian">
                Google Search
              </h3>
              <div
                className={cn(
                  "w-full h-auto bg-[#202124] px-4 py-2 rounded-md flex flex-col items-start justify-start overflow-hidden"
                )}
              >
                <div className="top w-full group cursor-pointer">
                  <div className="w-full flex flex-row items-center justify-start">
                    <div className="flex-shrink-0 bg-white border-[#9aa0a6] border rounded-full w-[26px] h-[26px] mr-[12px] align-middle inline-flex justify-center items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFQklEQVR4Aa1XA5BkSRAd2zbb/bsHrbVt294dc23b7h2fbdsMnG2OPcd39TN6dLv9fw8q4kXUz8qq9zKrKrvargfNj2Exg5nhXYYqhr8I1CebmXzIt/+anKGIoYUBNqLFMkfWF2IPhtOWCNE70NxTtFbPGin/uKeEri6usLe3v9XYxz3Jho6h0hZCFxcX+Hj7wM3VDZFhkYiLjiMBVkRU0to2RF4lRuzp4YmYyBgYkg2QxEnAyTmYUk2Ij41HfEy8FQGEKuIQ2POPhIj9/fyhlnHQKpKgSlRDrzVQXy3hoNPooNPqkMwlIzw0XCiAj6ydiVNiUWtkGiK+JSRqaORaHpSNAL8AIRGnbrpqQqc9KCAIKqmKiERA2VBLWZZUWjofArdD3lVAsTVyZydnxLPDxbHodcokZM2aji0LZmPB6NGYYBrMg/q5c2Zgybix4CQcCUllWxIWHCaQBeKk5svQas0xIjSCFjSqU/DhlQNofuAiCA9dRsvDV3hQv93+/oU9GJZiAG2HSiMkoJW4LaUT1pAYKyEBJ9cv6yR/8BJaHrmK1sduEFifbO3jTx4soDkKiVLkKhO3nVnIKS4yjhZ7++zu/wm4hrYnSwis301A430XoFcl0xUVFkDcdu8KOYUGhUHNBFTfdaa7gIf5DJgJrN9VAGGkzoSo8CgRAcQtXHh8vHwwkB2oyjvP4OXj21CSvwEn1i3FYwcK0PLQFcKj+/PJVsrGXj6xDVVMLH9m/Hx8RQQQt93f1hwmKyJRkTYPI3QmiuqThyuQl7YPt58+jW+u7iFb0/0X8OWVXTi+5QBO7T+Dzx4qJ7uRS2Fz52KMRPAm/C0oYElqAr44mQ2TSkuLfvpgGXZvPYu7zffg14fMaGI2Hr88UoJ7i+/HjoJT+Oz+YvI1KDh8cSILc7VxwgKEtiDAwwWv5c3B3TnL0cgipf2lqC+y1F9G473nLNtwmWxdD+FdbM6LWTPh4+ostgXCh3DFQDV+vryVyDoP4WU6+fV3naZDyPpks4yT78+XtmBeqlT8EIpdw2g/D/xq3oOaiiPdilADI6m9/Rhanyhm392LUU35Efx0bSdCPV1tuoaLRZyQGOiN57ev6poBtveXUFV6EFUlB+kcdM3Ac8w3PsBLhJywWLQUt2OhQY7Ge86214H2YkRostgo/fecwXy93BZyKsWiP0btcHKwx7PbVnZEWXfHCVSXHaIs1N15ssP+9NYVcGS+NggoFv45trIV317Z2Xkb7jtPaP/+5soOlnpvWx+rcisPEmGMkkWismQ/EXZFZfE+jJRG2PqAPdWrJ5mfXI3kiVPw5cG1+PZ4Or4/k0NgfbKlTJ+NkFQj+Yo9yWx+lLp4eSM8SQfJlNkwZRRialYuu/+nUFm0F79f302oKtqHBmabnJFNPtLp8xA7eAScPb2EHqXCz3IHVzcEylRIXrAMA7O2wJhegAGZmzEuuwDV957vvBGW34M6dhYm5ZAPDGn5GMTmaGYtQIiSg6Obu83PcmqukZGygWkFHw/O3krESWsyKLKU9dlEcHDfdroF7QLq2S04un87P0Y+xrQCcKvS6HtIzjYMy972sXdCQs/+punW7fFgpKfZIn/pNuZCtXwD9JvyoFmdDj37vrorm+58471ncW5nDtm0TGgqE6BYtr49Y3/xa/Br2fW26bMK5WyhIkN6foti2QaKjIkgssuHd+L84R18n+zK5RuhWrkJjLSFn2PM3UpR90tLzs72G5BRuFi/KdfMrUx7V7Mmo8q0Kecvw8acv7RrMqu41WnvGtPzzbwP72vruv8B4AdSgZUWguEAAAAASUVORK5CYII="
                        }
                        alt="Author's profile picture"
                        className="w-[18px] h-[18px] rounded-full"
                      />
                    </div>
                    <div className="flex-grow w-[calc(100%-26px-12px)]">
                      <span className="text-sm">thedev.id</span>
                      <div className="w-full flex flex-row items-center">
                        <cite className="w-full block truncate text-[#bdc1c6] text-[12px] leading-[18px] not-italic">
                          {"https://arif.thedev.id"}
                          <span className="text-[#bdc1c6]">{` › blogs › ${
                            data.slug || ""
                          }`}</span>
                        </cite>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="truncate text-xl text-[#8ab4f8] leading-[1.3] font-[arial,sans-serif] font-normal pb-2 group-hover:underline">
                      {data?.title || ""}
                    </h3>
                  </div>
                </div>
                <div className="bottom line-clamp-2 text-sm text-[#bdc1c6]">
                  <span className="text-[#9aa0a6]">
                    {formatDate(new Date(), "$d $MMM $y")}
                    {" — "}
                  </span>
                  {data?.description || ""}
                </div>
              </div>
            </div>

            {/* Twitter */}
            <div className="w-full mt-2">
              <h3 className="text-lg font-medium text-muted-foreground font-noto_serif_georgian">
                Twitter Link Preview
              </h3>
              <div
                className={cn(
                  "relative w-full h-auto max-w-[512px] mx-auto aspect-[512/268] rounded-md border overflow-hidden"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data?.thumbnail || ""}
                  alt="Thumbnail"
                  width={512}
                  height={268}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute z-10 left-3 bottom-3 px-1 text-[13px] rounded-[4px] bg-black/30">
                  {"arif.thedev.id"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
