import { Collection } from "@/types/collections";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface NFTCardProps {
  collection: Collection;
  isLast: Boolean;
  newLimit: Function;
}

const NFTCard: React.FC<NFTCardProps> = ({ collection, isLast, newLimit }) => {
  const cardRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  if (!collection) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-black">Loading...</h2>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md"
      ref={cardRef}
      onClick={() => router.push("/collection/" + collection.collection)}
    >
      <img
        src={
          collection.image_url
            ? collection.image_url
            : "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
        }
        placeholder="blur"
        className="w-full h-60 object-cover mb-4 rounded-t-lg"
        loading="lazy"
      />
      <h2 className="text-xl font-semibold text-black m-4 whitespace-normal break-words">
        {collection.name}
      </h2>
    </div>
  );
};

export default NFTCard;
