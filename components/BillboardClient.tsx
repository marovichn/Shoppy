"use client";

import { FC } from "react";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";

interface BillboardClientProps {
  data: Billboard[];
}

const BillboardClient: FC<BillboardClientProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          description='Manage billboards for your store'
          title={`Billboards (${data.length})`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default BillboardClient;
