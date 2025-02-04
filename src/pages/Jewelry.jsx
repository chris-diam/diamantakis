import React, { useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import arxaio from "../assets/arxaio-kosmima.jpeg";

const Jewelry = ({ artworks = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", "paintings", "sculptures", "jewelry"];

  const filteredArtworks =
    selectedCategory === "all"
      ? artworks
      : artworks.filter((art) => art.category === selectedCategory);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${arxaio})`,
        backgroundSize: "cover", // Changed to cover for better mobile response
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Category Filter */}
        <div className="mb-4 sm:mb-8 overflow-x-auto bg-white/80 p-2 sm:p-4 rounded-lg backdrop-blur-sm">
          <div className="flex space-x-2 sm:space-x-4 p-1 sm:p-2 w-full justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredArtworks.map((artwork) => (
            <div className="bg-white/80 rounded-lg backdrop-blur-sm p-2 sm:p-4">
              <ArtworkCard key={artwork.id} artwork={artwork} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-6 sm:py-12 bg-white/80 rounded-lg backdrop-blur-sm px-4">
            <h3 className="text-lg sm:text-xl text-stone-600">
              No artworks found in this category
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jewelry;
