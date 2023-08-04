"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellActionColors";


export type ColorColumn = {
  id: string;
  name: string;
  createdAt:string;
  value: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
