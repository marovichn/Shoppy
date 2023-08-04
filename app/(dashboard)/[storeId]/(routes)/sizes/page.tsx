import BillboardClient from "@/components/BillboardClient";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";
import { SizeColumn } from "./components/ColumnsSizes";
import SizesClient from "./components/SizesClient";

interface SizesPageProps {
  params: { storeId: string };
}

const SizesPage: FC<SizesPageProps> = async ({ params }) => {
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((size) => {
    return {
      id: size.id,
      name: size.name,
      value:size.value,
      createdAt: format(size.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
