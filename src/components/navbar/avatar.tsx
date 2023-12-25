"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RefreshCw } from "lucide-react";

type Props = {};

export default function AvatarBtn({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden aspect-square"
        >
          <Avatar className={`h-full w-full rounded-none`}>
            <AvatarImage
              src={"https://github.com/shadcn.png"}
              alt={""}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className={`h-full w-full rounded-none`}>
              CN
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* Some tools buttons stcked horizontally */}
        <div className="flex flex-row gap-2 items-center justify-evenly">
          <Button
            title="Refresh"
            variant="ghost"
            size="icon"
            className="aspect-square h-8 w-8"
            onClick={() => {
              window.location.reload();
            }}
          >
            <RefreshCw size={16} />
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-muted-foreground">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
