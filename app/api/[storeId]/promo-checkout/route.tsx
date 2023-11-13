import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds, promocode } = await req.json();

  if (!productIds || productIds.length === 0 || !promocode) {
    return new NextResponse("Product ids are required, or no promotion", {
      status: 400,
    });
  }

  const products = await Promise.all(
    productIds.map(async (id: string) => {
      const product = await prismadb.product.findUnique({
        where: {
          id,
        },
      });
      return product;
    })
  );

  const productsDiscounted = products.map((product: any) => {
    return {
      ...product,
      price:
        product.price.toNumber() -
        product.price.toNumber() * Number(promocode.discountPercentAmount),
    };
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  productsDiscounted.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `https://shoppy-shop.vercel.app/cart?success=1`,
    cancel_url: `https://shoppy-shop.vercel.app/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
