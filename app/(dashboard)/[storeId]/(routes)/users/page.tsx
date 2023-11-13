import prismadb from "@/lib/prismadb";
import { FC } from "react";
import UsersClient from "./components/UsersClient";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { columns } from "@/components/Columns";
import { UsersColumn } from "./components/UsersColumns";

interface UsersPageProps {
  params: { storeId: string };
}

const UsersPage: FC<UsersPageProps> = async ({ params }) => {
  const users = await prismadb.user.findMany({
    where: { storeId: params.storeId }
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <UsersClient data={users}/>
      </div>
    </div>
  );
};

export default UsersPage;
