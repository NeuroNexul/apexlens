"use server";

import { compileMDX } from "next-mdx-remote/rsc";

import components from "./components";

export default async function serializeContent(content: string) {
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

    console.log("Monaco => ", res);

    return res;
  } catch (err) {
    console.log("Monaco Error => ", err);
    return null;
  }
}
