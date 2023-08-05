import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";
import { ColorColumn } from "./components/ColumnsColors";
import ColorsClient from "./components/ColorsClient";

interface ColorsPageProps {
  params: { storeId: string };
}

const ColorsPage: FC<ColorsPageProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => {
    return {
      id: color.id,
      name: color.name,
      value:color.value,
      createdAt: format(color.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
