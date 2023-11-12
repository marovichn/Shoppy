import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { promoId: string } }
) {
  try {
    if (!params.promoId) {
      return new NextResponse("Promo id is required", { status: 400 });
    }

    const promocode = await prismadb.promocodes.findUnique({
      where: {
        id: params.promoId,
      },
    });

    return NextResponse.json(promocode);
  } catch (error) {
    console.log("[PROMOCODE_UNIQUE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { promoId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.promoId) {
      return new NextResponse("Promo id is required", { status: 400 });
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

    const promocode = await prismadb.promocodes.findUnique({
      where: {
        id: params.promoId,
      },
    });
    const usersPromocodes = await prismadb.userPromocodes.deleteMany({
      where: {
        id: params.promoId,
        userAccessCode: promocode?.userAccessCode
      },
    });
    const promocodes = await prismadb.promocodes.delete({
      where: {
        id: params.promoId,
      },
    });

    return NextResponse.json(promocode);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { promoId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { userAccessCode, discountPercentAmount, startDate, endDate } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!userAccessCode || !discountPercentAmount || !startDate || !endDate) {
      return new NextResponse("Required fields missing", { status: 400 });
    }

    if (!params.promoId) {
      return new NextResponse("Proomo id is required", { status: 400 });
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

    const promocode = await prismadb.promocodes.updateMany({
      where: {
        id: params.promoId,
        userAccessCode: userAccessCode,
      },
      data: {
        userAccessCode,
        discountPercentAmount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(promocode);
  } catch (error) {
    console.log("[PROMOCODE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
