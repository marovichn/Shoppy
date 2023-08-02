import BillboardClient from "@/components/BillboardClient";
import { BillboardColumn } from "@/components/Columns";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { FC } from "react";

interface pageProps {
  params: { storeId: string };
}

const page: FC<pageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((bill) => {
    return {
      id: bill.id,
      label: bill.label,
      createdAt: format(bill.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default page;
