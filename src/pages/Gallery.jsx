import React from "react";
import { Link } from "react-router-dom";
import arxaioImage from "../assets/arxaio-kosmima.jpeg";
import eliaImage from "../assets/elia.jpeg";
import pouliaImage from "../assets/poulia.jpeg";
import karaviImage from "../assets/karavi.jpeg";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div
        className="h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${karaviImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              Welcome to Our Gallery
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Discover Our Unique Collection
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid with masonry-like layout */}
      <div className="container mx-auto px-4 py-16">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          <div className="relative group">
            <Link to="/jewelry" className="block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={arxaioImage}
                  alt="The Beauty of Rings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">THE BEAUTY OF RINGS</h3>
                  <p className="text-sm mt-2">DISCOVER THE COLLECTION</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="relative group mt-16">
            <Link to="/jewelry" className="block">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={eliaImage}
                  alt="2025 Good Luck Charm"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">2025 GOOD LUCK CHARM</h3>
                  <p className="text-sm mt-2">THE BLOSSOM ROSETTE</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-8">
          <div className="relative group -mt-32">
            <Link to="/jewelry" className="block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={pouliaImage}
                  alt="Bird Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">BIRD COLLECTION</h3>
                  <p className="text-sm mt-2">DISCOVER MORE</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="relative group mt-16">
            <Link to="/jewelry" className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={arxaioImage}
                  alt="Ancient Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">ANCIENT COLLECTION</h3>
                  <p className="text-sm mt-2">EXPLORE MORE</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
