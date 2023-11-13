"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UsersColumn = {
  id: string;
  email: string;
  storeId: string;
  hashedPassword: string;
  name: string;
  lastname: string;
  age: string;
  gender: string;
};

export const columns: ColumnDef<UsersColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "lastname",
    header: "Lastname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
];
