"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Clipboard } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import React from "react";
import { toast } from "sonner";

type Props = {
  children?: React.ReactNode;
};

export default function SyntaxHighlighter(params: Props) {
  if (!params.children) return null;
  const props = (params.children as any).props as {
    children?: string;
    className?: string;
    file?: string;
  };

  const code = props.children ? props.children : "";
  const language = props.className
    ? props.className?.replace("language-", "").trim()
    : "plaintext";

  return (
    <div className="bg-background border rounded-md overflow-hidden">
      <div className="bg-muted/40 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <span className="text-sm font-normal text-muted-foreground p-2">
            {language.toUpperCase()}
          </span>
          {props.file && (
            <h2 className="text-sm font-bold text-muted-foreground p-2">
              {props.file}
            </h2>
          )}
        </div>
        <div className="flex flex-row items-center p-1">
          <Button
            variant="ghost"
            className="p-1 h-7 w-7"
            size="icon"
            title="Copy Code!"
            onClick={() => {
              navigator.clipboard.writeText(code.trim());
              toast.success("Code copied to clipboard!");
            }}
          >
            <Clipboard size={16} />
          </Button>
        </div>
      </div>
      <ScrollArea className="w-full h-full" orientation="horizontal">
        <Highlight
          code={code.trim()}
          language={language}
          theme={{
            plain: {
              color: "#FFFFFF",
              backgroundColor: "#020817",
              background: "#020817",
              backgroundImage: "",
              cursor: "#ffffff",
              fontStyle: "normal",
              fontWeight: "400",
              opacity: 1,
              textDecorationLine: "none",
              textShadow: "",
            },
            styles: [],
          }}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={style}
              className={cn("text-sm w-max p-4 overflow-visible")}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {/* <span>{i + 1}</span> */}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </ScrollArea>
    </div>
  );
}
