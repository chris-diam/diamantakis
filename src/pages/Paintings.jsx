import React, { useState, useEffect } from "react";
import ArtworkCard from "../components/ArtworkCard";
import pasxa from "../assets/matomeno-pasxa.jpeg";

const Paintings = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          "https://diamantakis-server.onrender.com/api/v1/artworks?category=painting"
        );
        if (!response.ok) throw new Error("Failed to fetch artworks");

        const data = await response.json();
        setArtworks(data.data.artworks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

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
        backgroundImage: `url(${pasxa})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Artworks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {artworks.map((artwork) => (
            <div
              key={artwork._id}
              className="bg-white/80 rounded-lg backdrop-blur-sm p-2 sm:p-4 hover:shadow-lg transition-all duration-300"
            >
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {artworks.length === 0 && (
          <div className="text-center py-6 sm:py-12 bg-white/80 rounded-lg backdrop-blur-sm px-4">
            <h3 className="text-lg sm:text-xl text-stone-600">
              No paintings available at the moment
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paintings;
