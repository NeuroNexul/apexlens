import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Models } from "appwrite";
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
        <div className="w-full h-auto max-w-[40rem] mx-auto py-14">
          {/* Title */}
          <div className="w-full pb-4">
            <Label htmlFor="title">Title of this blog post:</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={data?.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="mt-1"
            />
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
            <Label htmlFor="description">Description of this blog post:</Label>
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
              onChange={(e) => setData({ ...data, thumbnail: e.target.value })}
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
      </ScrollArea>
    </div>
  );
}
