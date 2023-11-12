import BillboardClient from "@/components/BillboardClient";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";
import { PromoColumn } from "./components/ColumnsPromos";
import PromosClient from "./components/PromosClient";

interface PromosPageProps {
  params: { storeId: string };
}

const PromosPage: FC<PromosPageProps> = async ({ params }) => {
  const promos = await prismadb.promocodes.findMany({
    where: { storeId: params.storeId },
  });

  const formattedPromos: PromoColumn[] = promos.map((promo) => {
    return {
      id: promo.id,
      userAccessCode: promo.userAccessCode,
      discountPercentAmount: promo.discountPercentAmount,
      startDate: format(promo.startDate, "MMMM do, yyyy"),
      endDate: format(promo.endDate, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <PromosClient data={formattedPromos} />
      </div>
    </div>
  );
};

export default PromosPage;
