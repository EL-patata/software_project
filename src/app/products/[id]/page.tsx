import { Shield } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "~/components/AddToCartButton";
import { Separator } from "~/components/ui/separator";
import { db } from "~/server/db";
import { formattCurrency } from "~/utils/formattCurrency";

export default async function page({ params }: { params: { id: string } }) {
  const product = await db.query.products.findFirst({
    where: (model, { eq }) => eq(model.id, params.id),
  });

  if (!product) return notFound();
  if (product)
    return (
      <main>
        <section className="grid grid-cols-1 place-items-center gap-3 md:grid-cols-2 lg:px-24">
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
      </main>
    );
}
