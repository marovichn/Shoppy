import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";
import { ProductColumn } from "./components/ColumnsProducts";
import ProductClient from "./components/ProductClient";
import { formatter } from "@/lib/utils";

interface ProductsPageProps {
  params: { storeId: string };
}

const ProductsPage: FC<ProductsPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(product.price.toNumber()),
      createdAt: format(product.createdAt, "MMMM do, yyyy"),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,
      stockAmount: product.stockAmount
        ? Number(product.stockAmount).toString()
        : "1",
    };
  });

  return (
    <div className='overflow-x-hidden max-w-screen flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='overflow-x-hidden flex-1 space-y-4 p-8 pt-6 '>
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
