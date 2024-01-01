"use client";

import { cn } from "@/lib/utils";
import {
  BarChart,
  FileImage,
  FileText,
  Home,
  MessageSquareQuote,
  PackageOpen,
  PenLine,
  ServerCog,
  Settings,
  Settings2,
  TrendingUp,
  Triangle,
  UserCog,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Logo from "./logo";

export type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: Omit<NavItem, "children">[];
};

const NavItems = (): NavItem[] => [
  {
    name: "Home",
    href: "/",
    icon: <Home size={24} />,
  },
  {
    name: "Blogs",
    href: "/blogs",
    icon: <PenLine size={24} />,
  },
  {
    name: "Testimonials",
    href: "#",
    icon: <MessageSquareQuote size={24} />,
  },
  {
    name: "Assets",
    href: "/assets",
    icon: <PackageOpen size={24} />,
    children: [
      {
        name: "Images/Videos",
        href: "/assets/images",
        icon: <FileImage size={24} />,
      },
      {
        name: "Documents",
        href: "#",
        icon: <FileText size={24} />,
      },
    ],
  },
  {
    name: "Analytics",
    href: "#",
    icon: <TrendingUp size={24} />,
    children: [
      {
        name: "Google Analytics",
        href: "#",
        icon: <BarChart size={24} />,
      },
      {
        name: "Vercel Analytics",
        href: "#",
        icon: <Triangle size={24} />,
      },
    ],
  },
  {
    name: "Settings",
    href: "#",
    icon: <Settings size={24} />,
    children: [
      {
        name: "Profile Settings",
        href: "#",
        icon: <UserCog size={24} />,
      },
      {
        name: "Server Settings",
        href: "#",
        icon: <ServerCog size={24} />,
      },
      {
        name: "App Settings",
        href: "#",
        icon: <Settings2 size={24} />,
      },
    ],
  },
];

type Props = {
  isCollapsed: boolean;
  unCollapse: () => void;
};

export default function NavContent({ isCollapsed, unCollapse }: Props) {
  const currentPath = usePathname();
  const [activeLink, setActiveLink] = React.useState<string>("");
  const [active, setActive] = React.useState<string | undefined>(undefined);

  return (
    <div className="w-full h-full">
      <ScrollArea orientation="vertical" width={6} className="h-full">
        <nav className="flex flex-col items-stretch justify-start whitespace-nowrap">
          {/* Logo */}
          <div className="w-full h-auto border-b grid place-items-center py-2 px-2 sm:hidden">
            <Logo />
          </div>

          {/* Nav Items */}
          <Accordion
            type="multiple"
            onValueChange={(value) => {
              if (value.length !== 0 && isCollapsed) unCollapse();
            }}
            value={isCollapsed ? [] : [active || ""]}
            style={{
              width: isCollapsed ? 49 : "100%",
              transition: "width 200ms ease",
            }}
          >
            <TooltipProvider delayDuration={200} skipDelayDuration={200}>
              {NavItems().map(({ name, href, icon, children }) => {
                if (!children)
                  return (
                    <div
                      key={name}
                      className={cn(
                        "w-full px-2 py-1", // Container
                        isCollapsed && "px-1", // Container
                        "transition-all duration-200" // Transition
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <Link
                            href={href}
                            className={cn(
                              "flex items-center justify-start", // Container
                              "rounded-md", // Border
                              "w-full h-10 px-4", // Size
                              "text-sm font-medium text-primary", // Text
                              "hover:bg-primary/10 active:bg-primary/20", // Hover
                              "transition-all duration-200", // Transition
                              isCollapsed && "px-2 pl-[0.6rem]" // Container
                            )}
                          >
                            <span className="mr-3 h- full">{icon}</span>
                            <span>{name}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <span>{name}</span>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                else
                  return (
                    <div
                      key={name}
                      className={cn(
                        "w-full px-2 py-1", // Container
                        isCollapsed && "px-1", // Container
                        "transition-all duration-200" // Transition
                      )}
                    >
                      <AccordionItem
                        value={name}
                        className={cn(
                          "border-none", // Border
                          "rounded-md border-none", // Border
                          "text-sm font-medium text-primary", // Text
                          "hover:bg-primary/10 data-[state=open]:bg-primary/10", // Hover
                          "transition-colors duration-200" // Transition
                        )}
                        onClick={() =>
                          setActive((e) =>
                            e === name && !isCollapsed ? undefined : name
                          )
                        }
                      >
                        <Tooltip>
                          <TooltipTrigger className="w-full" asChild>
                            <AccordionTrigger
                              className={cn(
                                "w-full h-10 px-4", // Size
                                "hover:no-underline", // Hover
                                isCollapsed && "px-2 pl-[0.6rem]" // Container
                              )}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-start" // Container
                                )}
                              >
                                <span className="mr-3 h- full">{icon}</span>
                                <span>{name}</span>
                              </div>
                            </AccordionTrigger>
                          </TooltipTrigger>

                          <TooltipContent side="right">
                            <span>{name}</span>
                          </TooltipContent>
                        </Tooltip>
                        <AccordionContent>
                          <nav className="flex flex-col items-stretch justify-start border-t pt-2 border-background">
                            {children.map(({ name, href, icon }) => (
                              <div
                                key={name}
                                className={cn(
                                  "w-full px py-1" // Container
                                )}
                              >
                                <Tooltip>
                                  <TooltipTrigger className="w-full">
                                    <Link
                                      href={href}
                                      className={cn(
                                        "flex items-center justify-start", // Container
                                        "rounded-md", // Border
                                        "w-full h-10 px-4", // Size
                                        "text-sm font-medium text-primary", // Text
                                        "hover:bg-primary/10", // Hover
                                        "transition-colors duration-200" // Transition
                                      )}
                                    >
                                      <span className="mr-3 h- full">
                                        {icon}
                                      </span>
                                      <span>{name}</span>
                                    </Link>
                                  </TooltipTrigger>

                                  <TooltipContent side="right">
                                    <span>{name}</span>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ))}
                          </nav>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  );
              })}
            </TooltipProvider>
          </Accordion>
        </nav>
      </ScrollArea>
    </div>
  );
}
