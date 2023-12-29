"use client";

import React from "react";
import { CompileMDXResult, compileMDX } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import style from "./preview.module.css";
import components from "./components";
// import serializeContent from "./get_mdx_data";

async function serializeContent(content: string) {
  // export default async function serializeContent(form: FormData) {
  try {
    const res = await compileMDX({
      // source: form.get("content") as string,
      source: content,
      options: {
        mdxOptions: {
          development: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
          remarkPlugins: [],
          rehypePlugins: [],
          baseUrl: "/",
          useDynamicImport: true,
          format: "mdx",
        },
        scope: {},
        parseFrontmatter: false,
      },
      components,
    });

    return res;
  } catch (err) {
    console.log("Monaco Error => ", err);
    return null;
  }
}

type Props = {
  slug: string;
  content: string;
};

export default function Preview({ slug, content }: Props) {
  const [mdxNode, setMdxNode] = React.useState<CompileMDXResult<
    Record<string, unknown>
  > | null>(null);

  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    (async () => {
      const res = await serializeContent(content);
      if (res) {
        setMdxNode(res);
      }
    })();
  }, [content]);

  return (
    <div className="w-full h-full bg-background">
      <div className={cn("w-full p-2", style.content)}>
        {mdxNode && mdxNode.content}
      </div>
    </div>
  );
}
