import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { userAccessCode, discountPercentAmount, startDate, endDate } = body;
    console.log(userAccessCode, discountPercentAmount, startDate, endDate);

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!userAccessCode || !discountPercentAmount || !startDate || !endDate) {
      return new NextResponse("Required fields missing", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);

    const userpromocode = await prismadb.promocodes.create({
      data: {
        userAccessCode,
        discountPercentAmount,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(userpromocode);
  } catch (error) {
    console.log("[promocodes_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const promocodes = await prismadb.promocodes.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(promocodes);
  } catch (error) {
    console.log("[promocodes_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
