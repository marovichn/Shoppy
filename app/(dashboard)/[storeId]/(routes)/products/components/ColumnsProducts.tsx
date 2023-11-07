"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellActionProducts";

export type ProductColumn = {
  id: string;
  name: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: string;
  category: string,
  size: string,
  color: string;
  stockAmount:string | null;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.color}
        <div
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "isFeatured",
    header: "Featuring",
  },
  {
    accessorKey: "isArchived",
    header: "Archive",
  },
  {
    accessorKey: "stockAmount",
    header: "In Stock",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.stockAmount ? row.original.stockAmount : "1"}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
