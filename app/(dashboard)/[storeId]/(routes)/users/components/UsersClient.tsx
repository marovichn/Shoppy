"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { UsersDataTable } from "./UsersDataTable";
import { UsersColumn, columns } from "./UsersColumns";

interface UsersClientProps {
  data: UsersColumn[];
}

const UsersClient: FC<UsersClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        description='Users data in your store'
        title={`Users (${data.length})`}
      />
      <Separator />
      <UsersDataTable searchKey='products' columns={columns} data={data} />
    </>
  );
};

export default UsersClient;
