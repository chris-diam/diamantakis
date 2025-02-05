import React, { useState } from "react";
import ArtworkCard from "../components/ArtworkCard";
import arxaio from "../assets/arxaio-kosmima.jpeg";
import useArtworks from "../hooks/useArtworks";

const Jewelry = () => {
  const { artworks, loading, error } = useArtworks("jewelry");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${arxaio})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {artworks.map((artwork) => (
            <div
              key={artwork._id}
              className="bg-white/80 rounded-lg backdrop-blur-sm p-2 sm:p-4"
            >
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-6 sm:py-12 bg-white/80 rounded-lg backdrop-blur-sm px-4">
            <h3 className="text-lg sm:text-xl text-stone-600">
              No jewelry available at the moment
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jewelry;
