"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { PanelLeftOpen } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function NavBar({ children }: Props) {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = React.useState(false);

  function toggleLeftPanel() {
    setIsLeftPanelOpen((prev) => !prev);
  }

  return (
    <div className="relative w-full h-full">
      <header
        className={cn(
          "w-full border-b", // Container
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", // Background
          "sticky top-0 z-50" // Position
        )}
      >
        {/* Container */}
        <div className="container flex h-12 items-center px-4">
          {/* Menu Button */}
          <Button
            variant={"ghost"}
            className="p-1 h-auto mr-3"
            onClick={toggleLeftPanel}
          >
            <PanelLeftOpen size={24} />
          </Button>

          {/* Logo */}
          <div className="flex items-center mr-6">
            <h2 className="text-xl font-bold text-primary">ApexLens</h2>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "w-full h-full" // Container
        )}
      >
        {/* Left Panel */}
        <div
          className={cn(
            "fixed lg:fixed top-[49px]", // Position
            "w-full h-[calc(100%-49px)]", // Container
            "lg:bg-transparent lg:backdrop-blur-none", // Background
            isLeftPanelOpen &&
              "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", // Background
            "transition-all duration-300", // Transition
            "lg:pointer-events-none", // Events
            isLeftPanelOpen ? "pointer-events-auto" : "pointer-events-none" // Events
          )}
          onClick={toggleLeftPanel}
        >
          {/* Panel Container */}
          <div
            className={cn(
              "w-[250px] h-full", // Container
              isLeftPanelOpen ? "lg:w-[250px]" : "lg:w-[49px]", // Container
              "lg:transform-none lg:translate-x-0 lg:will-change-transform", // Position
              isLeftPanelOpen
                ? "transform-none w-[250px]"
                : "transform -translate-x-full w-[49px]", // Position
              "transition-all duration-300", // Transition
              "pointer-events-auto", // Events
              "border-r bg-background/30" // Style
            )}
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>

        {/* Main Content */}
        <div
          className={cn(
            "!w-full lg:!w-[calc(100%-250px)] h-[calc(100%-49px)]", // Container
            isLeftPanelOpen
              ? "lg:!w-[calc(100%-250px)]"
              : "lg:!w-[calc(100%-49px)]", // container
            "!transform-none lg:!transform-cpu lg:will-change-transform", // Position
            "transition-all duration-300" // Transition
          )}
          style={{
            // @ts-ignore
            "--tw-translate-x": isLeftPanelOpen ? "250px" : "49px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
