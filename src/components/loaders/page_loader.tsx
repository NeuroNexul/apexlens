import React from "react";
import LogoSVG from "../logo";
import { cn } from "@/lib/utils";
import style from "./page_loader.module.css";

type Props = {};

export default function PageLoader({}: Props) {
  return (
    <div className="w-full h-full relative grid place-items-center">
      <div
        className={cn("fixed top-0 left-0 w-full h-full")}
        style={{
          boxShadow: "rgb(0 0 0 / 90%) 0px 0px 200px 100px inset",
        }}
      />

      <div className="">
        <div className="logo flex w-auto h-auto items-center gap-2 whitespace-nowrap">
          <LogoSVG className="text-primary w-10 h-10 aspect-square" />
          <h2 className="text-4xl font-bold text-primary font-rubik_vinyl">
            ApexLens
          </h2>
        </div>

        <div
          className={cn(
            style.loader,
            "w-full mt-4 ![--bar-color:hsl(var(--muted-foreground))]"
          )}
        />

        <p className="text-center mt-2 text-muted-foreground">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
