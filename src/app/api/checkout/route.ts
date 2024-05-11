import { CartItem } from "~/components/context/ShoppingCartProvider";
import { stripe } from "~/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { orderedProducts, orders } from "~/server/db/schema";
import { getServerAuthSession } from "~/server/auth";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  const cartItems = await request.json();

  const lineItems = cartItems.map((item: CartItem) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        description: item.description,
        images: [item.imageUrl],
      },
    },
  }));

  const origin = request.headers.get(`origin`);

  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",

    mode: "payment",

    payment_method_types: [`card`],

    line_items: lineItems,

    shipping_address_collection: {
      allowed_countries: [`US`],
    },

    billing_address_collection: "auto",

    success_url: `${origin}/thank_you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  const userSession = await getServerAuthSession();

  const totalPrice = cartItems.reduce((total: number, cartItem: CartItem) => {
    const item = cartItems.find((item: CartItem) => item.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const ordered = cartItems.flatMap((item: CartItem) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  if (session.created) {
    const order = await db
      .insert(orders)
      .values({
        id: randomUUID(),
        userId: userSession?.user.id!,
        paid: totalPrice,
      })
      .returning();

    ordered.forEach(async (item: CartItem) => {
      await db.insert(orderedProducts).values({
        id: randomUUID(),
        productId: item.id,
        orderId: order[0]?.id!,
        productQuantity: item.quantity,
      });
    });
  }

  return NextResponse.json(session);
}
