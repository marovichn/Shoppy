"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { PromoColumn, columns } from "./ColumnsPromos";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {ApiList} from "@/components/ApiList";
import { PromosDataTable } from "./PromosDataTable";

interface PromosClientProps {
  data: PromoColumn[];
}

const PromosClient: FC<PromosClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between flex-row max-sm:flex-col max-sm:items-start'>
        <Heading
          description='Manage promotions for your store'
          title={`Promos (${data.length})`}
        />
        <Button
          className='max-sm:mt-5'
          onClick={() => router.push(`/${params.storeId}/promos/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <PromosDataTable searchKey='name' columns={columns} data={data} />
    </>
  );
};

export default PromosClient;
