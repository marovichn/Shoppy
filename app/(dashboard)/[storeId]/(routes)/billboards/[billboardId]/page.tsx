import BillbooardForm from "@/components/BillboardForm";
import prismadb from "@/lib/prismadb";
import { FC } from "react";

interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage: FC<BillboardPageProps> = async ({ params }) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillbooardForm initialData={billboard}/>
      </div>
    </div>
  );
};

export default BillboardPage;
