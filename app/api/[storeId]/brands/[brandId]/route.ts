import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brand = await prismadb.brand.findUnique({
      where: {
        id: params.brandId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_UNIQUE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { brandId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
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

    const brand = await prismadb.brand.delete({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, description, images } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
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

    await prismadb.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        name,
        description,
        images: {
          deleteMany: {},
        },
      },
    });

    const brand = await prismadb.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
