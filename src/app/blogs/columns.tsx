import { ColumnDef, Row } from "@tanstack/react-table";
import { PartialCreatedBlogDocumentType } from "./page";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronsUpDown,
  ExternalLink,
  Eye,
  Info,
  Lock,
  MoreHorizontal,
  Pencil,
  RefreshCw,
  Timer,
  Trash,
} from "lucide-react";
import { stringifyNumberData } from "@/lib/utils";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AppwriteClientService from "@/appwrite/client";

export const useColumns = ({
  openedBlog,
  setopenedBlog,
  refreshData,
}: {
  openedBlog: string;
  setopenedBlog: (value: string) => void;
  refreshData: () => void;
}): ColumnDef<PartialCreatedBlogDocumentType>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <ActionsComponent row={row} refreshData={refreshData} />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex flex-row gap-2 items-center max-w-xs min-w-[250px]">
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.thumbnail || ""}
                alt={data.title}
                referrerPolicy="no-referrer"
                className="rounded-md h-full w-auto max-w-[80px]"
              />
            </span>
            <span className="w-full line-clamp-2" title={data.title}>
              {data.title}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "published",
      header: ({ column }) => {
        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <Lock className="h-4 w-4 mr-1" />
              Visibility
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <Badge
              variant="outline"
              className={`rounded-full
                                ${
                                  data.published
                                    ? "border-green-500"
                                    : "border-yellow-500"
                                }
                                ${
                                  data.published
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }
                                [--tw-bg-opacity:0.3]
                            `}
            >
              {data.published ? "Published" : "Draft"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "reading_time",
      header: ({ column }) => {
        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <Timer className="h-4 w-4 mr-1" />
              <span className="whitespace-nowrap">Reading Time</span>
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <span className="text-base font-medium">{data.reading_time}</span>
            <span className="text-muted-foreground">min</span>
          </div>
        );
      },
    },
    {
      accessorKey: "view",
      header: ({ column }) => {
        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="whitespace-nowrap"
            >
              <Eye className="h-4 w-4 mr-1" />
              Views
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <span className="text-base font-medium">
              {stringifyNumberData(data.view)}
            </span>
            <span className="text-muted-foreground">
              ({data.view.toLocaleString()})
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "$createdAt",
      header: ({ column }) => {
        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="whitespace-nowrap"
            >
              Posted On
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <span>{new Date(data.$createdAt).toDateString()}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "$updatedAt",
      header: ({ column }) => {
        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="whitespace-nowrap"
            >
              Last Updated
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex flex-row gap-1 items-center justify-center">
            <span>{new Date(data.$updatedAt).toDateString()}</span>
          </div>
        );
      },
    },
  ];
};

function ActionsComponent({
  row,
  refreshData,
}: {
  row: Row<PartialCreatedBlogDocumentType>;
  refreshData: () => void;
}) {
  const [alertItem, setAlertItem] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();
  const appwriteClient = React.useMemo(() => new AppwriteClientService(), []);
  const data = row.original;

  function DangerActionFunction() {
    startTransition(() => {
      if (alertItem === 1) {
        toast.success(data.published ? "Unpublishing Blog" : "Publishing Blog");
        appwriteClient.database
          .updateDocument("production", "blogs", data.$id, {
            published: !data.published,
          })
          .then(() => {
            toast.success(
              data.published ? "Unpublished Blog" : "Published Blog"
            );
            refreshData();
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else if (alertItem === 2) {
        toast.success("Deleting Blog");
        appwriteClient.database
          .deleteDocument("production", "blogs", data.$id)
          .then(() => {
            toast.success("Deleted Blog");
            refreshData();
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
      setAlertItem(0);
    });
  }

  return (
    <>
      {isPending ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="text-muted-foreground">
              Actions
            </DropdownMenuLabel>
            {/* Open In New Window */}
            <DropdownMenuItem
              onClick={() => {
                toast.success("Opening Blog in New Tab");
                window.open(
                  `https://arif.thedev.id/blogs/${data.slug}`,
                  "_blank"
                );
              }}
            >
              Open Blog in New Tab
              <DropdownMenuShortcut>
                <ExternalLink className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            {/* Edit */}
            <DropdownMenuItem asChild>
              <Link href={`/blogs/${data.$id.toString()}`} passHref>
                Edit
                <DropdownMenuShortcut>
                  <Pencil className="h-4 w-4" />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Danger Zone */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-red-600">
                Danger Zone
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48">
                  <DropdownMenuItem
                    onClick={() => {
                      setAlertItem(1);
                    }}
                  >
                    {data.published ? "Unpublish" : "Publish"} Blog
                    <DropdownMenuShortcut>
                      <Info className="h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setAlertItem(2);
                    }}
                  >
                    Delete Blog
                    <DropdownMenuShortcut>
                      <Trash className="h-4 w-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog
        open={alertItem > 0}
        onOpenChange={(open) => setAlertItem(open ? alertItem : 0)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure{" "}
              {alertItem === 1
                ? data.published
                  ? "Unpublish"
                  : "Publish"
                : "Delete"}{" "}
              this blog post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertItem === 2
                ? "This action cannot be undone. This will permanently change your account in our servers."
                : "This action will change user status in our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={DangerActionFunction}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
