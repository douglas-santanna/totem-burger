import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}
const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseQuantity, increaseQuantity } = useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      {/*ESQUERDA*/}
      <div className="flex items-center gap-2">
        <div className="relative h-20 w-20">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-xl bg-gray-100 object-contain p-2"
          />
        </div>
        <div className="space-y-1">
          <p className="font-xs max-w-[90%] truncate text-ellipsis">
            {product.name}
          </p>
          <p className="font-sm font-semibold">{formatPrice(product.price)}</p>
          {/*QUNATIDADE*/}
          <div className="item-center flex gap-1 text-center">
            <Button
              variant="outline"
              className="h-7 w-7 rounded-xl"
              onClick={() => decreaseQuantity(product.id)}
            >
              <Minus />
            </Button>
            <p className="w-7">{product.quantity}</p>
            <Button
              variant="destructive"
              className="h-7 w-7 rounded-xl"
              onClick={() => increaseQuantity(product.id)}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      {/*DIREITA - BOTAO REMOVER*/}
      <Button className="h-7 w-7 rounded-xl" variant="outline">
        <Trash />
      </Button>
    </div>
  );
};

export default CartProductItem;
