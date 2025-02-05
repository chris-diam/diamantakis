// src/components/ArtworkCard.jsx
import React from "react";

const ArtworkCard = ({ artwork }) => {
  return (
    <div className="h-full">
      <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
        {artwork.images && artwork.images[0] && (
          <img
            src={`data:${artwork.images[0].contentType};base64,${artwork.images[0].data}`}
            alt={artwork.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-800">{artwork.title}</h3>
        <p className="text-sm text-gray-600">{artwork.description}</p>
        <p className="text-amber-700 font-medium">€{artwork.price}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
