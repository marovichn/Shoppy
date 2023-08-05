import prismadb from "@/lib/prismadb";
import { FC } from "react";
import CategoryForm from "../components/ProductForm";
import ProductDorm from "../components/ProductForm";
import ProductForm from "../components/ProductForm";

interface ProductPageProps {
  params: { productId: string; storeId: string };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          colors={colors}
          sizes={sizes}
          categories={categories}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
