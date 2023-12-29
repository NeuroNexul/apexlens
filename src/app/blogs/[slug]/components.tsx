import { MDXProvider } from "@mdx-js/react";

const components: React.ComponentProps<typeof MDXProvider>["components"] = {
  h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold" {...props} />,
  h4: (props) => <h4 className="text-xl font-bold" {...props} />,
  h5: (props) => <h5 className="text-lg font-bold" {...props} />,
  h6: (props) => <h6 className="text-base font-bold" {...props} />,
  p: (props) => <p className="text-base" {...props} />,
  a: (props) => <a className="text-primary" {...props} />,
  ul: (props) => <ul className="list-disc list-inside" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside" {...props} />,
  li: (props) => <li className="text-base" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-primary pl-4" {...props} />
  ),
  hr: (props) => <hr className="my-4" {...props} />,
  table: (props) => <table className="w-full" {...props} />,
  thead: (props) => <thead className="bg-background" {...props} />,
  tbody: (props) => <tbody className="bg-background" {...props} />,
  th: (props) => <th className="p-2 font-bold text-left" {...props} />,
  tr: (props) => <tr className="border-b border-muted-foreground" {...props} />,
  td: (props) => <td className="p-2" {...props} />,
  inlineCode: (props) => (
    <code className="px-1 py-0.5 bg-background text-primary" {...props} />
  ),
  pre: (props) => <pre className="p-2 bg-background" {...props} />,
  YouTube: ({ id, title, ...props }) => (
    <div className="w-full h-auto max-w-[40rem] mx-auto rounded-lg overflow-hidden mt-4 mb-2">
      <iframe
        className="w-full h-[calc(40rem/1.777)]"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        {...props}
      />
    </div>
  ),
};

export default components;
