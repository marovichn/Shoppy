"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellActionBrands";

export type BrandColumn = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<BrandColumn>[] = [
  {
    accessorKey: "name",
    header: "Brand Name",
  },
  {
    id: "description",
    header:"Brand Description",
    cell: ({ row }) => <div>{row.original.description.slice(0, 40)}...</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
