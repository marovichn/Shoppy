import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";
import { CategoryColumn } from "./components/ColumnsCategories";
import CategoryClient from "./components/CategoriesClient";

interface CategoriesPageProps {
  params: { storeId: string };
}

const CategoriesPage: FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include:{
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: format(category.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
