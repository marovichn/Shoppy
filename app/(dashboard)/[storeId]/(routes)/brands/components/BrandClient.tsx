"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BrandColumn, columns } from "./ColumnsBrands";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ApiList";
import { BrandDataTable } from "./BrandsDataTable";

interface BrandClientProps {
  data: BrandColumn[];
}

const BrandClient: FC<BrandClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between flex-row max-sm:flex-col max-sm:items-start'>
        <Heading
          description='Manage brands for your store'
          title={`Brands (${data.length})`}
        />
        <Button
          className='max-sm:mt-5'
          onClick={() => router.push(`/${params.storeId}/brands/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <BrandDataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for specific brands' />
      <Separator />
      <ApiList entityName='brands' entityIdName='brandId' />
    </>
  );
};

export default BrandClient;
