// src/pages/ShoppingCart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useShop } from "../context/ShopContext";

const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-light text-[#4A3F35] mb-4">
              Your Shopping Bag is Empty
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
        <h1 className="text-3xl font-light text-[#4A3F35] mb-8">
          Shopping Bag
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
              >
                <div className="w-24 h-24">
                  <img
                    src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#4A3F35]">
                    {item.title}
                  </h3>
                  <p className="text-[#C5B073]">€{item.price}</p>

                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item._id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-stone-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item._id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-stone-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
            <h2 className="text-xl font-medium text-[#4A3F35] mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>€{getCartTotal()}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-[#C5B073] text-white py-3 px-6 rounded-md hover:bg-[#4A3F35] transition-colors mt-6 text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
