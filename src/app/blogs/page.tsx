import AppwriteServerService from "@/appwrite/server";
import { Query } from "appwrite";
import { Metadata } from "next";
import React from "react";
import { DataTable } from "./data-table";

export type PartialCreatedBlogDocumentType = {
  description: string;
  published: boolean;
  reading_time: number;
  slug: string;
  tags: string[];
  thumbnail: string;
  title: string;
  view: number;
  view_ip: string[];
  $id: string;
  $createdAt: number;
  $updatedAt: number;
};

export const metadata: Metadata = {
  title: "Blogs",
  description: "Blogs",
};

export default async function page() {
  const appwriteClient = new AppwriteServerService();

  const response = await appwriteClient.database.listDocuments(
    "production",
    "blogs",
    [
      Query.select([
        "description",
        "published",
        "reading_time",
        "slug",
        "tags",
        "thumbnail",
        "title",
        "view",
        "view_ip",
        "$id",
        "$createdAt",
        "$updatedAt",
      ]),
    ]
  );

  return (
    <div className="sm:container mx-auto sm:py-5 h-full">
      <DataTable initial_data={response.documents} />
    </div>
  );
}
