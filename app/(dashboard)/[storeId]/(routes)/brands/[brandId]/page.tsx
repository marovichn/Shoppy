import prismadb from "@/lib/prismadb";
import { FC } from "react";
import BrandForm from "../components/BrandForm";

interface BrandPageProps {
  params: { brandId: string; storeId: string };
}

const BrandPage: FC<BrandPageProps> = async ({ params }) => {
  const brands = await prismadb.brand.findUnique({
    where: {
      id: params.brandId,
    },
    include: {
      images: true,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BrandForm
          initialData={brands}
        />
      </div>
    </div>
  );
};

export default BrandPage;
