import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPrice } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDialogOpen, setFinishOrderDialogOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>
        <div className="width-full flex h-full flex-col py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Total</p>
                <p className="text-sm font-semibold">{formatPrice(total)}</p>
              </div>
            </CardContent>
          </Card>
          <Button
            className="mt-6 w-full rounded-full"
            onClick={() => setFinishOrderDialogOpen(true)}
          >
            Finalizar pedido
          </Button>
          <FinishOrderDialog
            open={finishOrderDialogOpen}
            onOpenChange={setFinishOrderDialogOpen}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
