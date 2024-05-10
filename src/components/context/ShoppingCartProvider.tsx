"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "~/components/ui/use-toast";
import { useSessionStorage } from "~/hooks/use-session-storage";
import { Product } from "~/types/product";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = Product & {
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (addedItem: CartItem) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  setIsFiltersOpen: Dispatch<SetStateAction<boolean>>;
  isFiltersOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useSessionStorage<CartItem[]>(
    "shopping-cart",
    [],
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  function getItemQuantity(_id: string) {
    return cartItems.find((item) => item.id === _id)?.quantity || 0;
  }
  function increaseCartQuantity(addedItem: CartItem) {
    setCartItems((currItems) => {
      const item = currItems.find((item) => item.id === addedItem.id);
      if (item == null) {
        toast({
          title: "Item added to cart.",
          duration: 3000,
        });
        return [...currItems, { ...addedItem, _id: addedItem.id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === addedItem.id) {
            return { ...(item as any), quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(_id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === _id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== _id);
      } else {
        return currItems.map((item) => {
          if (item.id === _id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(_id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== _id);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCart,
        cartItems,
        cartQuantity,
        isFiltersOpen,
        setIsFiltersOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
