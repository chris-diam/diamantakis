import React, { useState } from "react";
import ArtworkCard from "../components/ArtworkCard";

const Gallery = ({ artworks = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", "paintings", "sculptures", "jewelry"];

  const filteredArtworks =
    selectedCategory === "all"
      ? artworks
      : artworks.filter((art) => art.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4 min-w-max p-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-amber-700 text-white"
                  : "bg-stone-100 text-stone-800 hover:bg-stone-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>

      {/* Empty State */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl text-stone-600">
            No artworks found in this category
          </h3>
        </div>
      )}
    </div>
  );
};

export default Gallery;
