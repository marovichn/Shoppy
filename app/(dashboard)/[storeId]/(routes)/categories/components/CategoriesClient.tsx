"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumn, columns } from "./ColumnsCategories";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {ApiList} from "@/components/ApiList";
import { CategoryDataTable } from "./CategoriesDataTable";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between flex-row max-sm:flex-col max-sm:items-start'>
        <Heading
          description='Manage categories for your store'
          title={`Categories (${data.length})`}
        />
        <Button
          className='max-sm:mt-5'
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <CategoryDataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for specific categories' />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
};

export default CategoryClient;
