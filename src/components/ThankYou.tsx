"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formattCurrency } from "~/utils/formattCurrency";
import { useShoppingCart } from "./context/ShoppingCartProvider";

type Props = {};

export default function ThankYou({}: Props) {
  // return <div>ThankYou</div>;

  const { cartItems, clearCart } = useShoppingCart();

  return (
    <main className="relative lg:min-h-[90vh]">
      <div className="hidden h-80 overflow-hidden lg:absolute lg:block lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/thank_you.avif"
          className="h-full w-full scale-75 object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-primary">Order successful</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight  sm:text-5xl">
              Thanks for ordering
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              We appreciate your order, and we&apos;re currently processing it.
              So hang tight and we&apos;ll send you confirmation very soon!
            </p>

            <div className="mt-16 text-sm font-medium">
              <ul className="mt-6 divide-y divide-border border-t border-border text-sm font-medium text-muted-foreground">
                {cartItems.map((product) => {
                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        <Image
                          fill
                          src={product.imageUrl}
                          alt={`${product.name} image`}
                          className="flex-none rounded-md  object-contain"
                        />
                      </div>

                      <div className="flex flex-auto flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="">{product.name}</h3>

                          <p className="my-1">Category: {product.category}</p>
                        </div>
                      </div>

                      <p className="flex-none font-medium ">
                        {formattCurrency(product.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-16 border-t border-border py-6 text-right">
                <Link
                  onClick={clearCart}
                  href="/"
                  className="text-sm font-medium text-primary hover:brightness-125"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
