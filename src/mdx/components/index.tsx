import { ScrollArea } from "@/components/ui/scroll-area";
import { MDXProvider } from "@mdx-js/react";
import LiveReact from "./live-react";
import SyntaxHighlighter from "./syntax_highlighter";
import { cn, slugify } from "@/lib/utils";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const components: React.ComponentProps<typeof MDXProvider>["components"] = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-4xl font-bold font-space_grotesk my-4 border-b-[3px] pb-1 pt-[0.3rem]"
      id={slugify((children || "").toString())}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className={cn(
        "text-3xl font-bold font-space_grotesk my-4 border-b-[3px] pb-1 pt-[0.3rem]", // Text
        "w-full flex flex-row justify-normal items-start gap-3" // Flex
      )}
      id={slugify((children || "").toString())}
      {...props}
    >
      <Link
        href={`#${slugify((children || "").toString())}`}
        className="after:hidden !p-0"
      >
        <LinkIcon className="w-5 h-9 text-[#31e5c4] cursor-pointer hover:drop-shadow-[0_0_5px_#31e5c4]" />
      </Link>
      <span>{children}</span>
    </h2>
  ),
  h3: (props) => (
    <h3 className="text-2xl font-bold font-space_grotesk mb-2" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-xl font-bold font-space_grotesk" {...props} />
  ),
  h5: (props) => (
    <h5 className="text-lg font-bold font-space_grotesk" {...props} />
  ),
  h6: (props) => (
    <h6 className="text-base font-bold font-space_grotesk" {...props} />
  ),
  p: (props) => <p className="text-base mt-2 mb-2" {...props} />,
  a: (props) => <a className="text-primary" {...props} />,
  u: (props) => <u className="text-primary no-underline" {...props} />,
  ul: (props) => <ul className="list-outside" {...props} />,
  ol: (props) => <ol className="list-outside" {...props} />,
  li: (props) => <li className="text-base" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-primary pl-4" {...props} />
  ),
  hr: (props) => <hr className="my-4" {...props} />,
  table: (props) => (
    <figure className="w-full h-auto rounded-lg border-[3px] overflow-hidden mt-4 mb-2">
      <ScrollArea className="w-full h-full" orientation="horizontal">
        <table className="w-full" {...props} />
      </ScrollArea>
    </figure>
  ),
  thead: (props) => (
    <thead className="bg-muted/40 font-space_grotesk" {...props} />
  ),
  tbody: (props) => <tbody className="bg-background" {...props} />,
  th: (props) => (
    <th className="p-2 font-bold text-center border-r" {...props} />
  ),
  tr: (props) => <tr className="border-b" {...props} />,
  td: (props) => <td className="p-2 border-r" {...props} />,
  img: (props) => {
    return (
      <figure className="inline-table clear-both w-auto max-w-[40rem] h-auto max-h-[30rem] mx-auto mt-4 mb-2 px-2 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="block rounded-lg mx-auto max-w-full max-h-[30rem] object-contain"
          alt={props.alt || ""}
          {...props}
        />
        {props.title && (
          <figcaption className="text-center text-sm text-muted-foreground py-1">
            {props.title}
          </figcaption>
        )}
      </figure>
    );
  },
  code: ({ children, ...props }) => {
    // Find Colors
    const hexColors = children?.toString().match(/#[0-9a-f]{3,6}/gi);
    const otherTexts = children?.toString().split(/#[0-9a-f]{3,6}/gi);

    if (hexColors && otherTexts && hexColors.length + 1 === otherTexts.length) {
      return (
        <code
          className="px-1 py-0.5 bg-muted/70 text-primary rounded-sm"
          {...props}
        >
          {otherTexts.map((text, index) => (
            <React.Fragment key={index}>
              {text}
              {hexColors[index] && (
                <span
                  className="inline-block w-3 h-3 rounded-sm border border-primary/50 mr-1 align-middle cursor-pointer"
                  style={{ backgroundColor: hexColors[index] }}
                  title={hexColors[index]}
                  onClick={() => {
                    navigator.clipboard.writeText(hexColors[index] || "");
                    toast.success("Copied to clipboard!", {
                      description: hexColors[index] || "",
                      descriptionClassName:
                        "text-primary w-full px-2 py-1 rounded-md bg-muted/70",
                    });
                  }}
                />
              )}
              {hexColors[index] || ""}
            </React.Fragment>
          ))}
        </code>
      );
    }

    return (
      <code
        className="px-1 py-0.5 bg-muted/70 text-primary rounded-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: SyntaxHighlighter,
  Youtube: ({ id, title, ...props }) => (
    <div className="w-full h-auto max-w-[40rem] mx-auto rounded-lg overflow-hidden mt-4 mb-2">
      <iframe
        className="w-full h-[calc(40rem/1.777)]"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        {...props}
      />
    </div>
  ),
  LiveReact: LiveReact,
};

export default components;
