import { Expand, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "~/components/AddToCartButton";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { formattCurrency } from "~/utils/formattCurrency";

export default async function page({ params }: { params: { id: string } }) {
  const product = await db.query.products.findFirst({
    where: (model, { eq }) => eq(model.id, params.id),
  });

  if (!product) return notFound();

  const similairProducts = await db.query.products.findMany({
    where: (model, { eq, and, ne }) =>
      and(eq(model?.category, product.category!), ne(model.id, product.id!)),
    limit: 4,
  });

  if (product)
    return (
      <main className="lg:px-24">
        <section className="grid grid-cols-1 place-items-center gap-3 md:grid-cols-2 ">
          <div className="flex h-full flex-col justify-center gap-2 p-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-3">
              <p className="font-semibold">{formattCurrency(+product.price)}</p>
              <Separator orientation="vertical" />
              <p className="capitalize text-muted-foreground">
                {product.category}
              </p>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <AddToCartButton product={product as any} />
            <p className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Shield />
              30 Day Return Guarantee
            </p>
          </div>
          <div className="relative aspect-square w-3/4 ">
            <Image
              src={product.imageUrl!}
              alt={product.name!}
              fill
              className="object-contain"
            />
          </div>
        </section>
        <h1 className="text-2xl font-bold">More like this:</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {similairProducts?.map((product) => (
            <Link
              key={product.id}
              href={`${process.env.NEXTAUTH_URL!}/products/${product.id}`}
            >
              <Card className="grid h-[525px] gap-4 border-none p-4 shadow-none transition-all hover:shadow-lg">
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
                <CardFooter className="mt-auto  grid w-full grid-cols-2">
                  <p className="font-semibold">
                    {formattCurrency(+product.price)}
                  </p>
                  <Link
                    className={buttonVariants()}
                    href={`${process.env.NEXTAUTH_URL!}/products/${product.id}`}
                  >
                    See more
                    <Expand />
                  </Link>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    );
}
