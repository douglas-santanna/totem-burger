import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import { ConsumprionMethodOption } from "./components/consumprion-method-option";

interface RestaurantePageProps { params: Promise<{slug: string;}>; }

const RestaurantePage = async ({params}: RestaurantePageProps) => {
    const {slug} = await params;
    const restarant = await db.restaurant.findUnique({where: {slug}});
    if (!restarant) {
        return notFound();
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
            {/* LOGO E TITULO */}
            <div className="flex flex-col items-center gap-2">
                <Image src={restarant?.avatarImageUrl} alt={restarant?.name} width={82} height={82} />
                <h2 className="font-semibold">
                    {restarant?.name}
                </h2>
            </div>
            {/* BEM VINDO */}
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo!
                </h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos oferecendo praticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumprionMethodOption 
                option="DINE_IN"
                imageUrl="/dine_in.png" 
                imageAlt="Para comer aqui" 
                buttonText="Para comer aqui"
                slug={slug}
                />
                <ConsumprionMethodOption
                option="TAKEAWEY" 
                imageUrl="/takeaway.png" 
                imageAlt="Para levar" 
                buttonText="Para levar"
                slug={slug}
                />
            </div>
        </div>
    )
}

export  default RestaurantePage;