"use client";
import { Button } from "~/components/ui/button";
import { useShoppingCart } from "~/components/context/ShoppingCartProvider";
import getStripe from "~/lib/get-stripe";
import Image from "next/image";
import React from "react";
import { formattCurrency } from "~/utils/formattCurrency";
import { ShoppingBag } from "lucide-react";

const Page = () => {
  const { cartItems } = useShoppingCart();

  async function onCheckOut() {
    const stripe = await getStripe();

    const response = await fetch(`api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.ok) {
      const data = (await response.json()) as any;
      stripe.redirectToCheckout({ sessionId: data?.id });
    }
  }

  return (
    <main className="p-4">
      <h1 className="my-8 text-center text-4xl font-bold text-primary lg:text-start">
        Check out
      </h1>
      <ul className="grid gap-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col items-center gap-4 border-b-2 border-b-border p-2 last:border-none lg:flex-row"
          >
            <span className="relative block h-[240px] w-[240px]">
              <Image
                src={item.imageUrl}
                alt={`product ${item.name} picture`}
                fill
                priority
                className="object-contain"
              />
            </span>
            <span className="flex h-full flex-col gap-2 p-8">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="font-semibold">Quantity: {item.quantity}</p>
              <p className="font-semibold">
                Price: {formattCurrency(item.price)}
              </p>
              <p className="mt-auto font-bold">
                Sub total: {formattCurrency(item.price * item.quantity)}
              </p>
            </span>
          </li>
        ))}
      </ul>
      <div className="mx-auto flex items-center justify-between rounded-lg bg-accent p-2  lg:w-1/2">
        {" "}
        <p className="text-lg font-bold">
          Total price:{" "}
          {formattCurrency(
            cartItems.reduce((total, cartItem) => {
              const item = cartItems.find((item) => item.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0),
          )}
        </p>
        <Button onClick={onCheckOut} className="items-center gap-2">
          Check out <ShoppingBag />
        </Button>
      </div>
    </main>
  );
};

export default Page;
