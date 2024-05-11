import { Expand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "~/components/context/ShoppingCartProvider";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";
import { formattCurrency } from "~/utils/formattCurrency";

export default async function page({ params }: { params: { id: string } }) {
  const orderedProducts = await db.query.orderedProducts.findMany({
    where: (model, { eq }) => eq(model.orderId, params.id),
  });

  let data: any[] = [];

  orderedProducts.forEach(async (product) => {
    const res = await db.query.products.findFirst({
      where: (model, { eq }) => eq(model.id, product?.productId!),
    });

    data.push({ ...res, quantity: product.productQuantity });
  });

  const res = await db.query.products.findFirst({
    where: (model, { eq }) => eq(model.id, orderedProducts[0]?.productId!),
  });

  return (
    <div>
      <h1 className="px-8 py-2 text-2xl font-bold">
        Order number: {params.id}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((product: CartItem) => (
          <Card
            key={product.id}
            className="grid h-[525px] gap-4 border-none p-4 shadow-none transition-all hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="mb-auto">{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <span className="relative mx-auto block h-60 w-60">
                <Image
                  src={product?.imageUrl!}
                  alt={product?.name!}
                  fill
                  className="rounded object-contain"
                />
              </span>
            </CardContent>
            <CardFooter className="mt-auto  flex w-full flex-row items-center gap-2">
              <p className="font-semibold">{formattCurrency(+product.price)}</p>
              <p className="font-semibold">Quantity: {product.quantity}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
