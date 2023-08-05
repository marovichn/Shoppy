"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./ColumnsProducts";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ApiList";
import { ProductDataTable } from "./ProductsDataTable";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          description='Manage products for your store'
          title={`Products (${data.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <ProductDataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for specific products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  );
};

export default ProductClient;
