import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { formattCurrency } from "~/utils/formattCurrency";

export default async function page() {
  const session = await getServerAuthSession();

  const orders = await db.query.orders.findMany({
    where: (model, { eq }) => eq(model.userId, session?.user.id!),
  });

  const orderedProducts = await db.query.orderedProducts.findMany({
    where: (model, { eq }) => eq(model.orderId, session?.user.id!),
  });
  return (
    <div>
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Link</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                <Link
                  className={buttonVariants({
                    size: "icon",
                    className: "rounded-full",
                  })}
                  href={`/orders/${order.id}`}
                >
                  <ArrowRight />
                </Link>
              </TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-right">
                {formattCurrency(+order.paid!)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formattCurrency(
                orders.reduce((total: number, order) => {
                  return Math.round(total + +order?.paid!);
                }, 0),
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
