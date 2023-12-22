"use client";

import { cn } from "@/lib/utils";
import {
  BarChart,
  Home,
  MessageSquareQuote,
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

export type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
};

const NavItems = (): NavItem[] => [
  {
    name: "Home",
    href: "#",
    icon: <Home size={24} />,
  },
  {
    name: "Blogs",
    href: "#",
    icon: <PenLine size={24} />,
  },
  {
    name: "Testimonials",
    href: "#",
    icon: <MessageSquareQuote size={24} />,
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
  const [active, setActive] = React.useState<string | undefined>(undefined);

  return (
    <div className="w-full h-full">
      <ScrollArea orientation="vertical" width={6} className="h-full">
        <nav className="flex flex-col items-stretch justify-start whitespace-nowrap">
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
                    <a
                      href={href}
                      className={cn(
                        "flex items-center justify-start", // Container
                        "rounded-md", // Border
                        "w-full h-10 px-4", // Size
                        "text-sm font-medium text-primary", // Text
                        "hover:bg-primary/10", // Hover
                        "transition-all duration-200", // Transition
                        isCollapsed && "px-2 pl-[0.6rem]" // Container
                      )}
                    >
                      <span className="mr-3 h- full">{icon}</span>
                      <span>{name}</span>
                    </a>
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
                      <AccordionContent>
                        <nav className="flex flex-col items-stretch justify-start border-t pt-2 border-background">
                          {children.map(({ name, href, icon }) => (
                            <div
                              key={name}
                              className={cn(
                                "w-full px py-1" // Container
                              )}
                            >
                              <a
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
                                <span className="mr-3 h- full">{icon}</span>
                                <span>{name}</span>
                              </a>
                            </div>
                          ))}
                        </nav>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                );
            })}
          </Accordion>
        </nav>
      </ScrollArea>
    </div>
  );
}
