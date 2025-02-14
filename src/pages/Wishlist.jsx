// src/pages/Wishlist.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  const handleAddToCart = (artwork) => {
    addToCart(artwork);
    removeFromWishlist(artwork._id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-light text-[#4A3F35] mb-4">
              Your Wishlist is Empty
            </h2>
            <Link
              to="/gallery"
              className="inline-block bg-[#C5B073] text-white px-6 py-3 rounded-md hover:bg-[#4A3F35] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light text-[#4A3F35] mb-8">My Wishlist</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="aspect-square">
                <img
                  src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-[#4A3F35]">
                  {item.title}
                </h3>
                <p className="text-[#C5B073] mt-1">€{item.price}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-[#C5B073] text-white py-2 px-4 rounded-md hover:bg-[#4A3F35] transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="p-2 text-red-500 hover:text-red-600 border border-red-500 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
