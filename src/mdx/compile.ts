import {
  CompileMDXResult,
  MDXRemoteProps,
  compileMDX,
} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import * as embeds from "mdx-embed";
import components from "./components";

export interface CompileMDXOptions {
  source: MDXRemoteProps["source"];
}

export default async function parseMDX({
  source,
}: CompileMDXOptions): Promise<CompileMDXResult<Record<string, unknown>>> {
  const res = await compileMDX({
    source,
    options: {
      mdxOptions: {
        development: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        baseUrl: "/",
        useDynamicImport: true,
      },
      scope: {},
      parseFrontmatter: false,
    },
    components: {
      ...components,
      ...embeds,
    },
  });

  return res;
}
