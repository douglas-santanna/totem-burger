"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (Product: CartProduct) => void;
  decreaseQuantity: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseQuantity: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const addProduct = (product: CartProduct) => {
    //setProducts((prev) => [...prev, product]);

    const productExist = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (!productExist) {
      return setProducts((prev) => [...prev, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          console.log(product.quantity);
          return {
            ...prevProduct,
            quantity: product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) return prevProduct;

        if (prevProduct.quantity === 1) return prevProduct;

        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
