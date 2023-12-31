"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type Props = {
  editor: React.ReactNode;
  preview: React.ReactNode;
};

export default function SplitView({ editor, preview }: Props) {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResizablePanelGroup
      className="w-full h-full"
      direction={windowWidth > 768 ? "horizontal" : "vertical"}
    >
      <ResizablePanel className="w-full h-full">{editor}</ResizablePanel>
      <ResizableHandle className="w-1 h-full" withHandle />
      <ResizablePanel className="w-full h-full">{preview}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
