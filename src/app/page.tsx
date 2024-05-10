import { and, between, eq } from "drizzle-orm";
import { Expand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FilterButton from "~/components/FilterButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
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

type SearchParams = {
  name: string;
  searchQuery: string;
  category: string;
  price: string;
};

type Props = {
  searchParams: SearchParams;
};

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
    <>
      <nav className="grid w-full grid-cols-2 gap-2 lg:w-1/2  ">
        <FilterButton
          label="Men's clothing"
          value="men's clothing"
          param="category"
        />
        <FilterButton
          label="Electronics"
          value="electronics"
          param="category"
        />
      </nav>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((product) => (
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
    </>
  );
}
