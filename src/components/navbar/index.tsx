"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { BellIcon, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import NavContent from "./nav-content";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AvatarBtn from "./avatar";
import ThemeToggleButton from "../ui/theme-toggle";
import Logo from "./logo";

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
      <ScrollArea className="h-full">
        <header
          className={cn(
            "w-full border-b", // Container
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", // Background
            "sticky top-0 z-50" // Position
          )}
        >
          {/* Container */}
          <div className="container flex h-12 items-center px-4 gap-2">
            {/* Menu Button */}
            <Button
              variant={"ghost"}
              className="p-1 lg:hidden aspect-square overflow-hidden"
              onClick={toggleLeftPanel}
            >
              <PanelLeftOpen size={24} />
            </Button>

            {/* Logo */}
            <div className="items-center mr-6 ml-3 hidden sm:flex">
              <Logo />
            </div>

            <div className="flex-1 flex-grow hidden sm:block"></div>

            {/* Search */}
            <div className="flex-1 flex-grow max-w-sm ">
              <Button
                variant="outline"
                size="default"
                className={`w-full overflow-hidden flex flex-row justify-between items-center gap-5
                            cursor-pointer [color:hsl(var(--foreground)/70%)]`}
              >
                <Search size={16} />
                <span>Search...</span>
                <div className="flex-1 flex-grow"></div>
                <span className="border px-1 bg-accent rounded-sm align-middle">
                  <span className="text-sm">⌘</span>
                  <span className="text-xs">K</span>
                </span>
              </Button>
            </div>

            {/* Notifications */}
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden aspect-square"
              onClick={(e) => {
                toast.info("Coming Soon!", {
                  description: "Notifications is not available yet.",
                });
              }}
            >
              <BellIcon className={`h-[1.2em] w-[1.2em] rounded-none`} />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* Profile */}
            <AvatarBtn />
          </div>
        </header>

        <div
          className={cn(
            "w-full h-[calc(100%-49px)]" // Container
          )}
        >
          {/* Left Panel */}
          <div
            className={cn(
              "fixed lg:fixed top-[49px] z-50", // Position
              "w-full h-[calc(100%-49px)]", // Container
              "lg:bg-transparent lg:backdrop-blur-none", // Background
              isLeftPanelOpen &&
                "bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/10", // Background
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
                "border-r-2 bg-background/60" // Style
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={cn(
                  "h-full flex flex-col items-stretch overflow-hidden"
                )}
              >
                <div className={cn("w-full")}></div>
                <div
                  className={cn(
                    "w-full max-h-[calc(100%-28px)] lg:max-h-[calc(100%-40px-28px)] flex-1"
                  )}
                >
                  <NavContent
                    isCollapsed={!isLeftPanelOpen}
                    unCollapse={() => setIsLeftPanelOpen(true)}
                  />
                </div>

                {/* Creadits */}
                <div
                  style={{
                    opacity: isLeftPanelOpen ? 1 : 0,
                    pointerEvents: isLeftPanelOpen ? "auto" : "none",
                    transition: "opacity 300ms ease-in-out",
                  }}
                  className="border-t"
                >
                  <h3 className="text-xs font-medium text-primary px-4 pt-2 pb-1 whitespace-nowrap">
                    Developed & Maintained by{" "}
                    <a href="https://arif.thedev.id">Arif Sardar</a>
                  </h3>
                </div>

                {/* Bottom / Close Button */}
                <div
                  className={cn(
                    "w-full border-t h-10 hidden lg:flex flex-row justify-end"
                  )}
                >
                  <div className={cn("h-full aspect-square p-1")}>
                    <Button
                      variant="ghost"
                      className="p-1 h-full w-full"
                      onClick={toggleLeftPanel}
                    >
                      {isLeftPanelOpen ? (
                        <PanelLeftClose size={24} />
                      ) : (
                        <PanelLeftOpen size={24} />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            className={cn(
              "!w-full lg:!w-[calc(100%-250px)] h-full", // Container
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
      </ScrollArea>
    </div>
  );
}
