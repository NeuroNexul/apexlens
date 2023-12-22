import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs",
};

export default function page() {
  return (
    <div className={"w-full h-full"}>
      <h1 className={"text-xl"}>blogs</h1>
    </div>
  );
}
