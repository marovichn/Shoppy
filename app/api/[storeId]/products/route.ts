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

    const {
      name,
      description,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
      stockAmount,
      brandId
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }
    if (!brandId) {
      return new NextResponse("Brand Id is required", { status: 400 });
    }
    if (!stockAmount) {
      return new NextResponse("Stock amount is required", { status: 400 });
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

    const product = await prismadb.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        colorId,
        sizeId,
        brandId,
        isFeatured,
        isArchived,
        stockAmount,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
     const { searchParams } = new URL(req.url);
     const categoryId = searchParams.get("categoryId") || undefined;
     const colorId = searchParams.get("colorId") || undefined;
     const sizeId = searchParams.get("sizeId") || undefined;
     const brandId = searchParams.get("brandId") || undefined;
     const isFeatured = searchParams.get("isFeatured");

     if (!params.storeId) {
       return new NextResponse("Store id is required", { status: 400 });
     }

     const products = await prismadb.product.findMany({
       where: {
         storeId: params.storeId,
         categoryId,
         colorId,
         sizeId,
         brandId,
         isFeatured: isFeatured ? true : undefined,
         isArchived: false,
       },
       include: {
         images: true,
         category: true,
         color: true,
         size: true,
         brand: {
           include: {
             images: true,
           },
         },
         reviews:true
       },
       orderBy: {
         createdAt: "desc",
       },
     });

     return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
