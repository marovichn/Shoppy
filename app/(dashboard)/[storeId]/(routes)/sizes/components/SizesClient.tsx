"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./ColumnsSizes";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ApiList";
import { CategoryDataTable } from "./SizesDataTable";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          description='Manage sizes for your store'
          title={`Sizes (${data.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <CategoryDataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for specific categories' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId' />
    </>
  );
};

export default SizesClient;
