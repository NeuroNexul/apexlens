import React from "react";
import LogoSVG from "../logo";

type Props = {};

export default function Logo({}: Props) {
  return (
    <div className="flex h-full w-auto items-center gap-2">
      <LogoSVG className="text-primary w-6 h-6" />
      <h2 className="text-xl font-bold text-primary">ApexLens</h2>
    </div>
  );
}
