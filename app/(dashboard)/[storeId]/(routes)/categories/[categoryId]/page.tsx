
import prismadb from "@/lib/prismadb";
import { FC } from "react";
import CategoryForm from "../components/CategoryForm";

interface CategoryPageProps {
  params: { categoryId: string };
}

const CategoryPage: FC<CategoryPageProps> = async ({ params }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={category}/>
      </div>
    </div>
  );
};

export default CategoryPage;
