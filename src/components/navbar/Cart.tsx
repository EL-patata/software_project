"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { CreditCard, Minus, Plus, ShoppingCart, Trash, X } from "lucide-react";
import { useShoppingCart } from "../context/ShoppingCartProvider";
import Link from "next/link";
import { useState } from "react";
import { formattCurrency } from "~/utils/formattCurrency";
import { Separator } from "../ui/separator";

const Cart = () => {
  const {
    cartItems,
    cartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    clearCart,
  } = useShoppingCart();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"icon"}
        className="relative rounded-full max-[640px]:h-9 max-[640px]:w-9"
      >
        <ShoppingCart size="1.25rem" />
        {cartQuantity == 0 || (
          <p className="absolute -left-2 bottom-0 grid h-[20px] w-[20px] place-items-center rounded-full bg-primary text-xs font-normal text-foreground text-white outline outline-background">
            {cartQuantity > 9 ? "9+" : cartQuantity}
          </p>
        )}
      </Button>

      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        {cartItems.length > 0 ? (
          <SheetContent className="w-1/2 overflow-y-auto overflow-x-hidden border-border">
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
            </SheetHeader>
            <ul className="grid gap-2">
              {cartItems.map((item) => (
                <li key={item.id} className="grid gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.name} product image`}
                      width={60}
                      height={60}
                    />
                    <div className="w-full truncate">
                      <p className="truncate">{item.name}</p>
                      <p className="flex items-center gap-2">
                        <span className="mr-auto py-4 text-sm text-muted-foreground">
                          {formattCurrency(+item.price)}
                        </span>

                        <span>
                          {formattCurrency(item.quantity * +item.price)}{" "}
                        </span>
                        <Button
                          onClick={() => removeFromCart(item.id)}
                          size={"icon"}
                          variant={"destructive"}
                          className="h-8 w-8 rounded-full"
                        >
                          <X size="1.5rem" />
                        </Button>
                      </p>
                    </div>
                  </div>
                  <div className="mx-auto flex w-full items-center justify-center gap-1">
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => decreaseCartQuantity(item.id)}
                    >
                      <Minus />
                    </Button>
                    Quantity: {item.quantity}
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => increaseCartQuantity(item)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <Separator />
                </li>
              ))}
            </ul>

            <SheetFooter className="mt-2 flex-col gap-2 md:flex-col lg:flex-col">
              <p className="flex text-lg font-bold">
                <span className="mr-auto">Total price: </span>
                <span>
                  {formattCurrency(
                    cartItems.reduce((total: any, cartItem: any) => {
                      const item = cartItems.find(
                        (item) => item.id === cartItem.id,
                      );
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0),
                  )}
                </span>
              </p>
              <Button
                className="w-full gap-2"
                variant={`destructive`}
                onClick={clearCart}
              >
                <Trash size="1.25rem" /> Clear cart
              </Button>
              <Link
                onClick={() => setIsOpen(false)}
                href={"/checkout"}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-white transition-all hover:bg-primary/80"
              >
                <CreditCard size="1.25rem" /> Proceed to checkout
              </Link>
            </SheetFooter>
          </SheetContent>
        ) : (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart</SheetTitle>
            </SheetHeader>
            <SheetDescription>Cart is empty.</SheetDescription>
          </SheetContent>
        )}
      </Sheet>
    </>
  );
};

export default Cart;
