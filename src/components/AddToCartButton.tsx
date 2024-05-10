"use client";

import { Button, buttonVariants } from "./ui/button";
import { Check, CheckCheck, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { Product } from "~/types/product";
import { useShoppingCart } from "./context/ShoppingCartProvider";
import { toast } from "./ui/use-toast";

type Props = { product: Product };

const AddToCartButton = ({ product }: Props) => {
  const { increaseCartQuantity, cartItems } = useShoppingCart();

  function handleClick() {
    increaseCartQuantity({ ...product, quantity: 1 });
    toast({ title: "Added to cart" });
  }

  const isAdded = cartItems.find((item) => item.id === product.id);

  if (isAdded)
    return (
      <p
        className={buttonVariants({
          className: cn(
            "w-full gap-1.5 bg-primary/30 text-primary/[1] hover:bg-primary/[.30] md:mt-20",
          ),
        })}
      >
        Item added to cart. <CheckCheck />
      </p>
    );

  return (
    <Button onClick={handleClick} className="w-full md:mt-20">
      Add to cart
    </Button>
  );
};

export default AddToCartButton;
