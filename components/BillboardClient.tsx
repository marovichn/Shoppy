"use client";

import { FC } from "react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "./DataTable";
import {ApiList} from "./ApiList";
interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: FC<BillboardClientProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          description='Manage billboards for your store'
          title={`Billboards (${data.length})`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data}/>
      <Heading title="API" description="API calls for specific Billboards"/>
      <Separator/>
      <ApiList entityName="billboards" entityIdName="billboardId"/>
    </>
  );
};

export default BillboardClient;
