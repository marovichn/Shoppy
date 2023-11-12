import BillboardForm from "@/components/BillboardForm";
import prismadb from "@/lib/prismadb";
import { FC } from "react";
import PromosForm from "../components/PromosForm";

interface PromosPageProps {
  params: { promoId: string };}

const PromosPage: FC<PromosPageProps> = async ({ params }) => {
  const promos = await prismadb.promocodes.findUnique({
    where: {
      id: params.promoId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <PromosForm initialData={promos}/>
      </div>
    </div>
  );
};

export default PromosPage;
