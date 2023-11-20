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
    accessorKey: "description",
    header: "Brand Description",
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
