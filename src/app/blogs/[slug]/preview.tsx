"use client";

import React from "react";
import { CompileMDXResult, compileMDX } from "next-mdx-remote/rsc";
import { remarkCodeHike } from "@code-hike/mdx";
import { cn } from "@/lib/utils";
import style from "./preview.module.css";
import components from "./components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Button } from "@/components/ui/button";

async function serializeContent(content: string): Promise<{
  res: CompileMDXResult<Record<string, unknown>> | null;
  error?: Error;
}> {
  try {
    const res = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          // development: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
          development: true,
          remarkPlugins: [
            // [remarkCodeHike, { theme: "dark-plus" }]
          ],
          rehypePlugins: [],
          baseUrl: "/",
          useDynamicImport: true,
        },
        scope: {},
        parseFrontmatter: false,
      },
      components,
    });

    return { res };
  } catch (err: any) {
    return {
      res: null,
      error: err,
    };
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
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await serializeContent(content);
      if (res) {
        setMdxNode(res.res);
        setError(res.error || null);
      }
    })();
  }, [content]);

  return (
    <div className="w-full h-full bg-background">
      <ScrollArea className="w-full h-full scroll-block" orientation="vertical">
        <div className={cn("w-full p-2", style.content)}>
          <ErrorBoundary errorComponent={ErrorComp}>
            {mdxNode ? mdxNode?.content : <ErrorComp error={error} />}
          </ErrorBoundary>
        </div>
      </ScrollArea>
    </div>
  );
}

function ErrorComp({
  error,
  reset,
}: {
  error: Error | null;
  reset?: () => void;
}) {
  return (
    <div className="w-full min-h-full">
      <h1 className={cn("text-2xl font-medium text-destructive", "mt-4 mb-2")}>
        Something went wrong.
      </h1>
      <div className="rounded-md overflow-hidden">
        <pre
          className={cn(
            "text-base font-mono text-muted-foreground",
            "w-full p-2 overflow-x-auto",
            "bg-muted"
          )}
        >
          {error?.message}
        </pre>
      </div>
      {reset && (
        <Button onClick={reset} variant="outline" className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
}
