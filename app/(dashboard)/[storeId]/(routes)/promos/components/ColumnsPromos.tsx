"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellActionPromos";


export type PromoColumn = {
  id: string,
  userAccessCode:string,
  discountPercentAmount:string,
  startDate: string,            
  endDate:string    
};

export const columns: ColumnDef<PromoColumn>[] = [
  {
    accessorKey: "userAccessCode",
    header: "Access Code",
  },
  {
    accessorKey: "discountPercentAmount",
    header: "Discount Amount (Percent Decimal)",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
