"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ApiList from "@/components/ApiList";
import { ColorDataTable } from "./OrdersDataTable";
import { OrdersColumn, columns } from "./OrdersColumns";

interface OrdersClientProps {
  data: OrdersColumn[];
}

const OrdersClient: FC<OrdersClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          description='Manage orders for your store'
          title={`Orders (${data.length})`}
        />
      </div>
      <Separator />
      <ColorDataTable searchKey='name' columns={columns} data={data} />
    </>
  );
};

export default OrdersClient;
