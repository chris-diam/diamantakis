import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArtworkDetail = ({ artwork }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const { title, description, price, category, images, materials, dimensions } =
    artwork;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-stone-600 hover:text-amber-700 transition-colors flex items-center"
      >
        <ChevronLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden bg-stone-100">
            <img
              src={images[currentImageIndex]}
              alt={`${title} view ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Thumbnail Navigation */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-amber-700" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`${title} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-stone-800 mb-4">{title}</h1>
          <p className="text-2xl text-amber-700 font-semibold mb-6">
            ${price?.toLocaleString()}
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-stone-800 mb-2">
                Description
              </h2>
              <p className="text-stone-600">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-stone-800 mb-2">
                  Category
                </h2>
                <p className="text-stone-600 capitalize">{category}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-stone-800 mb-2">
                  Materials
                </h2>
                <p className="text-stone-600">{materials.join(", ")}</p>
              </div>
            </div>

            {dimensions && (
              <div>
                <h2 className="text-lg font-semibold text-stone-800 mb-2">
                  Dimensions
                </h2>
                <p className="text-stone-600">
                  {dimensions.height}H × {dimensions.width}W ×{" "}
                  {dimensions.depth}D cm
                </p>
              </div>
            )}

            <button className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors">
              Inquire About This Piece
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
