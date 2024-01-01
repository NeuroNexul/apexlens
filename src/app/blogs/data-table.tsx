"use client";

import React, { useTransition } from "react";
import { useColumns } from "./columns";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Loader2, PlusIcon, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import AppwriteClientService from "@/appwrite/client";
import { ID, Query } from "appwrite";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  initial_data: TData[];
}

export function DataTable<TData, TValue>({
  initial_data,
}: DataTableProps<TData, TValue>) {
  const appwriteClient = React.useMemo(() => new AppwriteClientService(), []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnFilterBy, setColumnFilterBy] = React.useState("title");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openedBlog, setopenedBlog] = React.useState("");
  const [data, setData] = React.useState<TData[]>(initial_data);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    setData(initial_data);
  }, [initial_data]);

  function createBlog() {
    startTransition(() => {
      const id = new Date().getTime().toString();
      appwriteClient.database
        .createDocument("production", "blogs", ID.unique(), {
          content:
            "## Clemontic Gear, ON!\nThe future is now, thanks to science! Clemontic Gear, ON!",
          description:
            "The future is now, thanks to science! Clemontic Gear, ON!",
          published: false,
          reading_time: 0,
          slug: id,
          tags: ["clemontic-gear", "science"],
          thumbnail:
            "https://res.cloudinary.com/di9pwtpmy/image/upload/v1704099460/image_uploads/Other_Dimension_Converter_kttewu.webp",
          title: "(New Blog) Clemontic Gear, ON!",
          view: 0,
          view_ip: [],
        })
        .then((response) => {
          if (response.$id) {
            setData((prev) => [
              ...prev,
              {
                description: response.description,
                published: response.published,
                reading_time: response.reading_time,
                slug: response.slug,
                tags: response.tags,
                thumbnail: response.thumbnail,
                title: response.title,
                view: response.view,
                view_ip: response.view_ip,
                $id: response.$id,
                $createdAt: response.$createdAt,
                $updatedAt: response.$updatedAt,
              } as any,
            ]);
            toast.success("Blog created successfully.");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to create blog.");
        });
    });
  }

  function refreshData() {
    startTransition(() => {
      appwriteClient.database
        .listDocuments("production", "blogs", [
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
        ])
        .then((response) => {
          setData(response.documents as any);
          toast.success("Data refreshed successfully.");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to refresh data.");
        });
    });
  }

  const columns = useColumns({
    openedBlog,
    setopenedBlog,
    refreshData,
  }) as ColumnDef<TData, TValue>[];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div
      className={cn(
        "rounded-md border h-full flex flex-col", // Container
        "bg-background/70 backdrop-blur-[2px] supports-[backdrop-filter]:bg-background/20" // Background
      )}
    >
      {isPending && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 z-10">
          <Loader2 size={48} className="animate-spin" />
        </div>
      )}

      <div className="flex items-center justify-between gap-1 border-b-4 p-2">
        <div className="flex gap-1">
          <Input
            placeholder={`Filter ${columnFilterBy}s...`}
            value={
              (table.getColumn(columnFilterBy)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(columnFilterBy)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Select
            defaultValue={"title"}
            onValueChange={(e) => setColumnFilterBy(e || "title")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <SelectItem
                        key={column.id}
                        className="capitalize"
                        value={column.id}
                      >
                        {column.id}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={createBlog}>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full relative flex-grow" orientation="both">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : // Array.from({ length: 5 }).map((_, i) => (
                //     <TableRow key={i}>
                //         <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                //         <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                //         <TableCell className='flex items-center justify-center gap-2'>
                //             <Skeleton className="h-8 w-8 rounded-full" />
                //             <Skeleton className="h-5 w-32" />
                //         </TableCell>
                //         <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                //         <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                //         <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                //         <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                //     </TableRow>
                // ))
                "No data found."}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="flex items-center justify-end px-2 py-2 border-t-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
