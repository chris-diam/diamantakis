// src/pages/ArtworkDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, addToWishlist, cart, wishlist } = useShop();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `https://diamantakis-server.onrender.com/api/v1/artworks/${id}`
        );
        if (!response.ok) throw new Error("Artwork not found");
        const data = await response.json();
        setArtwork(data.data.artwork);

        // Check if item is already in cart or wishlist
        setAddedToCart(cart.some((item) => item._id === id));
        setAddedToWishlist(wishlist.some((item) => item._id === id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id, cart, wishlist]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(artwork);
    setAddedToCart(true);
    // Show temporary success message
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToWishlist(artwork);
    setAddedToWishlist(true);
    // Show temporary success message
    setTimeout(() => setAddedToWishlist(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error || "Artwork not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full">
                <img
                  src={`data:${artwork.images[0].contentType};base64,${artwork.images[0].data}`}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-light text-[#4A3F35] mb-4">
                  {artwork.title}
                </h1>
                <p className="text-gray-600 mb-4">{artwork.description}</p>
                <p className="text-2xl text-[#C5B073] font-light">
                  €{artwork.price}
                </p>
              </div>

              {/* Materials & Dimensions */}
              {artwork.materials && artwork.materials.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#4A3F35] mb-2">
                    Materials
                  </h3>
                  <p className="text-gray-600">
                    {artwork.materials.join(", ")}
                  </p>
                </div>
              )}

              {artwork.dimensions && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-[#4A3F35] mb-2">
                    Dimensions
                  </h3>
                  <p className="text-gray-600">
                    {artwork.dimensions.width &&
                      `Width: ${artwork.dimensions.width}cm`}
                    {artwork.dimensions.height &&
                      ` | Height: ${artwork.dimensions.height}cm`}
                    {artwork.dimensions.depth &&
                      ` | Depth: ${artwork.dimensions.depth}cm`}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-6 rounded-md transition-colors flex items-center justify-center
                    ${
                      addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-[#C5B073] text-white hover:bg-[#4A3F35]"
                    }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className={`w-full py-3 px-6 rounded-md transition-colors flex items-center justify-center
                    ${
                      addedToWishlist
                        ? "bg-white text-[#C5B073] border-2 border-[#C5B073]"
                        : "border-2 border-[#C5B073] text-[#C5B073] hover:bg-[#C5B073] hover:text-white"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${
                      addedToWishlist ? "fill-current" : ""
                    }`}
                  />
                  {addedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
