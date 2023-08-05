import prismadb from "@/lib/prismadb";
import { FC } from "react";
import OrdersClient from "./components/OrdersClient";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { columns } from "@/components/Columns";
import { OrdersColumn } from "./components/OrdersColumns";

interface OrdersPageProps {
  params: { storeId: string };
}

const OrdersPage: FC<OrdersPageProps> = async ({ params }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrdersColumn[] = orders.map((order) => {
    return {
      id: order.id,
      phone: order.phone,
      address: order.address,
      products: order.orderItems.map((item)=>item.product.name).join(", "),
      totalPrice: formatter.format(order.orderItems.reduce((total, item)=>{return total + Number(item.product.price)}, 0)),
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
      isPaid: order.isPaid,
    };
  });

  return (
    <div className='flex-col min-[0px]:max-[460px]:pr-0'>
      <div className='flex-1 space-y-4 p-8 pt-6 '>
        <OrdersClient data={formattedOrders}/>
      </div>
    </div>
  );
};

export default OrdersPage;
