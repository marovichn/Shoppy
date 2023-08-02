import BillboardClient from "@/components/BillboardClient";
import prismadb from "@/lib/prismadb";
import axios from "axios";
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

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={billboards}/>
      </div>
    </div>
  );
};

export default page;
