"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RefreshCw } from "lucide-react";
import AppWriteClientService from "@/appwrite/client";
import { useAuth } from "../../appwrite/auth";

type Props = {};

export default function AvatarBtn({}: Props) {
  const auth = useAuth();
  const AppwriteClient = React.useMemo(() => {
    return new AppWriteClientService();
  }, []);

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
              src={""}
              alt={auth.account?.name}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className={`h-full w-full rounded-none`}>
              {auth.account?.name.split(" ").map((n) => n[0])}
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async (e) => {
            await AppwriteClient.deleteSession();
            auth.setAccount(null);
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
