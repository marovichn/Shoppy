import BillboardForm from "@/components/BillboardForm";
import prismadb from "@/lib/prismadb";
import { FC } from "react";
import SizesForm from "../components/SizesForm";

interface SizesPageProps {
  params: { sizeId: string };
}

const SizesPage: FC<SizesPageProps> = async ({ params }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizesForm initialData={size}/>
      </div>
    </div>
  );
};

export default SizesPage;
