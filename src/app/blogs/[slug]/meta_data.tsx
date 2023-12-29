import React from "react";

type Props = {
  slug: string;
};

export default function MetaData({ slug }: Props) {
  return (
    <div className="w-full h-full grid place-items-center bg-teal-600">
      <h1 className="text-3xl font-semibold text-white">Meta Data</h1>
      <p className="text-white">Slug: {slug}</p>
    </div>
  );
}
