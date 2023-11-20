import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";
import { BrandColumn } from "./components/ColumnsBrands";
import BrandClient from "./components/BrandClient";

interface BrandsPageProps {
  params: { storeId: string };
}

const BrandsPage: FC<BrandsPageProps> = async ({ params }) => {
  const brands = await prismadb.brand.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBrands: BrandColumn[] = brands.map((brand) => {
    return {
      id: brand.id,
      name: brand.name,
      description:brand.description,
      createdAt: format(brand.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='overflow-x-hidden max-w-screen flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='overflow-x-hidden flex-1 space-y-4 p-8 pt-6 '>
        <BrandClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandsPage;
