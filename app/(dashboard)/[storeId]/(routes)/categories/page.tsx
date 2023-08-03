import BillboardClient from "@/components/BillboardClient";
import { BillboardColumn } from "@/components/Columns";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";

interface CategoriesPageProps {
  params: { storeId: string };
}

const CategoriesPage: FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: BillboardColumn[] = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      createdAt: format(category.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default CategoriesPage;
