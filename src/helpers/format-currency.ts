import { Decimal } from "@prisma/client/runtime/library";
export const formatPrice = (price: Decimal | number) => {
  const value = typeof price === "number" ? price : price.toNumber();
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
