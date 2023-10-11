"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "./card";
import { toast } from "react-toastify";
import { Collection, ICollection } from "@/types/collections";
import collectionService from "@/services/collection.service";

const NFTGallery: React.FC = () => {
  const [nextData, setNextData] = useState<string | undefined>("");
  const [collectionData, setCollectionData] = useState<ICollection | null>(
    null
  );
  const [collections, setCollection] = useState<Collection[]>([]);

  const fetchCollections = async () => {
    try {
      const response = await collectionService.getAll(nextData);

      setCollectionData(response.data);
      setCollection((prev) => [...prev, ...response.data.collections]);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [nextData]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {collections &&
        collections?.map((collection, index) => (
          <NFTCard
            key={index}
            collection={collection}
            isLast={index === collections.length - 1}
            newLimit={() => setNextData(collectionData?.next)}
          />
        ))}
    </div>
  );
};

export default NFTGallery;
