import { and, eq } from "drizzle-orm";
import { Expand, Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { db } from "~/server/db";
import { products } from "~/server/db/schema";
import { formattCurrency } from "~/utils/formattCurrency";

type SearchParams = {
  name: string;
  searchQuery: string;
  category: string;
  price: string;
};

type Props = {
  searchParams: SearchParams;
};

async function deleteProduct(formData: FormData) {
  "use server";

  await db.delete(products).where(eq(products.id, formData.get("id") as any));

  revalidatePath("/");
}

export default async function page({ searchParams }: Props) {
  let data;

  if (searchParams.category) {
    const query = await db
      .select()
      .from(products)
      .where(and(eq(products.category, searchParams.category)));

    data = query;
  } else {
    const query = await db.query.products.findMany();
    data = query;
  }
  return (
    <div className="flex-1  ">
      {data?.map((product) => (
        <Card
          key={product.id}
          className="grid h-[525px] gap-4 border-none p-4 shadow-none transition-all hover:bg-accent"
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
          <CardFooter className="mt-auto  grid w-full grid-cols-3 gap-3">
            <p className="font-semibold">{formattCurrency(+product.price)}</p>
            <Link
              className={buttonVariants()}
              href={`${process.env.NEXTAUTH_URL!}/products/${product.id}`}
            >
              See more
              <Expand />
            </Link>
            <form action={deleteProduct}>
              <Input className="hidden" name="id" value={product.id} />
              <Button type="submit" className="w-full" variant={"destructive"}>
                Delete <Trash />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
