import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <div className="w-full h-full relative grid grid-cols-3">
      <div className="col-span-2 w-full h-full"></div>
      <div
        className={cn(
          "col-span-1 w-full h-full", // Container
          "grid place-items-center", // Display
          "border-l", // Border
          "bg-foreground/20 backdrop-filter backdrop-blur-[2px] supports-[backdrop-filter]:bg-foreground/10" // Background
        )}
      >
        <div className="flex flex-col items-center justify-start w-full h-auto">
          <h2 className="text-2xl font-bold text-center text-foreground font-noto_serif_georgian">
            Welcome to ApexLens
          </h2>
        </div>
      </div>
    </div>
  );
}
