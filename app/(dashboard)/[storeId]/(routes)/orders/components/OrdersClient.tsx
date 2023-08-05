"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { ColorDataTable } from "./OrdersDataTable";
import { OrdersColumn, columns } from "./OrdersColumns";

interface OrdersClientProps {
  data: OrdersColumn[];
}

const OrdersClient: FC<OrdersClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        description='Manage orders for your store'
        title={`Orders (${data.length})`}
      />
      <Separator />
      <ColorDataTable searchKey='products' columns={columns} data={data} />
    </>
  );
};

export default OrdersClient;
