"use client";

import Header from "@/components/header";
import "../../globals.css";
import { useEffect, useState } from "react";
import collectionService from "@/services/collection.service";
import { useParams, usePathname } from "next/navigation";
import { Collection } from "@/types/collections";

export default function Page({ params }: { params: { slug: string } }) {
  const [collection, setCollection] = useState<Collection>();

  const getCollectionDetail = async () => {
    const response = await collectionService.findOne(params?.slug);
    setCollection(response.data);
  };

  useEffect(() => {
    getCollectionDetail();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center p-4">
        <Header />
      </main>
      <div className="max-w-6xl mx-auto w-full items-center font-mono text-sm m-10 p-16">
        <img
          src={
            collection?.image_url ||
            "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
          }
          alt={collection?.name || "Default Image"}
          className="w-full h-full rounded-t-lg"
        />
        <h1 className="text-2xl font-bold mt-4">{collection?.name}</h1>
      </div>
    </div>
  );
}
