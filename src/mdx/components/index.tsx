import { ScrollArea } from "@/components/ui/scroll-area";
import { MDXProvider } from "@mdx-js/react";
import LiveReact from "./live-react";
import SyntaxHighlighter from "./syntax_highlighter";

const components: React.ComponentProps<typeof MDXProvider>["components"] = {
  h1: (props) => (
    <h1
      className="text-4xl font-bold mt-2 mb-4 border-b-[3px] pb-2"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-3xl font-bold mt-2 mb-4 border-b-[3px] pb-2"
      {...props}
    />
  ),
  h3: (props) => <h3 className="text-2xl font-bold mt-2 mb-4" {...props} />,
  h4: (props) => <h4 className="text-xl font-bold mt-2 mb-4" {...props} />,
  h5: (props) => <h5 className="text-lg font-bold mt-2 mb-4" {...props} />,
  h6: (props) => <h6 className="text-base font-bold mt-2 mb-4" {...props} />,
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
  thead: (props) => <thead className="bg-muted/40" {...props} />,
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
  code: (props) => (
    <code
      className="px-1 py-0.5 bg-muted/70 text-primary rounded-sm"
      {...props}
    />
  ),
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
