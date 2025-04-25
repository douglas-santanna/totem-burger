import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import Image from "next/image";
import Link from "next/link";

interface ProductsPros {
  products: Product[];
}

const formatPrice = (price: Decimal | number) => {
  const value = typeof price === "number" ? price : price.toNumber();
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Products = ({ products }: ProductsPros) => {
  return (
    <div className="space-y-3 px-5">
      {products.map((product) => (
        <Link
          key={product.id}
          href="/"
          className="flex items-center justify-between border-b pb-5"
        >
          {/*ESQUERDA*/}
          <div>
            <h3 className="text-sm font-medium"> {product.name} </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>

          {/*DIREITA*/}
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
