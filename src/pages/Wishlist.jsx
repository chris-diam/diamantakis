// src/pages/Wishlist.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, cart } = useShop();
  const { user } = useAuth();

  // Track items being added to cart for UI feedback
  const [addingToCart, setAddingToCart] = React.useState({});

  const handleAddToCart = (item) => {
    addToCart(item);

    // Show temporary success message
    setAddingToCart((prev) => ({
      ...prev,
      [item._id]: true,
    }));

    setTimeout(() => {
      setAddingToCart((prev) => ({
        ...prev,
        [item._id]: false,
      }));
    }, 2000);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-light text-[#4A3F35] mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add items to your wishlist to save them for later.
            </p>
            <Link
              to="/gallery"
              className="inline-block bg-[#C5B073] text-white px-6 py-3 rounded-md hover:bg-[#4A3F35] transition-colors"
            >
              Browse Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-light text-[#4A3F35] mb-8">
          My Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative">
                <Link to={`/artwork/${item._id}`}>
                  <img
                    src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/artwork/${item._id}`}>
                  <h3 className="text-lg font-medium text-[#4A3F35] hover:text-[#C5B073] transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-2">{item.artist}</p>
                <p className="text-[#C5B073] font-medium mb-4">€{item.price}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={
                    addingToCart[item._id] ||
                    cart.some((cartItem) => cartItem._id === item._id)
                  }
                  className={`w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center
                    ${
                      addingToCart[item._id]
                        ? "bg-green-500 text-white"
                        : cart.some((cartItem) => cartItem._id === item._id)
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-[#C5B073] text-white hover:bg-[#4A3F35]"
                    }`}
                >
                  {addingToCart[item._id] ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Added to Cart
                    </>
                  ) : cart.some((cartItem) => cartItem._id === item._id) ? (
                    "Already in Cart"
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
