import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const ArtworkCard = ({ artwork }) => {
  const { _id, title, category, image } = artwork;
  const imageUrl = `data:${image.contentType};base64,${image.data}`;

  return (
    <div className="group relative">
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-[#F5F5F0]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-[#C5B073] hover:text-white transition-colors">
          <Heart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-[#4A3F35] uppercase">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[#C5B073] uppercase">{category}</p>
        <Link
          to={`/artwork/${id}`}
          className="mt-2 inline-block text-sm uppercase tracking-wide text-[#4A3F35] hover:text-[#C5B073] transition-colors"
        >
          DISCOVER THE COLLECTION
        </Link>
      </div>
    </div>
  );
};

export default ArtworkCard;
