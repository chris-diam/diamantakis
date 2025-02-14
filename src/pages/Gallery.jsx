import React from "react";
import { Link } from "react-router-dom";
import arxaioImage from "../assets/arxaio-kosmima.jpeg";
import eliaImage from "../assets/elia.jpeg";
import pouliaImage from "../assets/poulia.jpeg";
import karaviImage from "../assets/karavi.jpeg";

const Gallery = () => {
  const collections = [
    {
      id: 1,
      image: arxaioImage,
      title: "THE BEAUTY OF RINGS",
      description: "DISCOVER THE COLLECTION",
      link: "/jewelry",
      position: "main",
    },
    {
      id: 2,
      image: eliaImage,
      title: "OLIVE COLLECTION",
      description: "INSPIRED BY NATURE",
      link: "/sculptures",
      position: "right",
    },
    {
      id: 3,
      image: pouliaImage,
      title: "BIRD COLLECTION",
      description: "FREEDOM IN DESIGN",
      link: "/gallery",
      position: "left",
    },
    {
      id: 4,
      image: arxaioImage,
      title: "HIGH JEWELRY",
      description: "EXPLORE MORE",
      link: "/jewelry",
      position: "bottom",
    },
  ];

  // Scroll to collections section
  const scrollToCollections = () => {
    const collectionsSection = document.getElementById("collections");
    collectionsSection.scrollIntoView({ behavior: "smooth" });
  };

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
            <p className="text-xl md:text-2xl font-light mb-8">
              Discover Our Unique Collection
            </p>
            <button
              onClick={scrollToCollections}
              className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-[#4A3F35] transition-colors duration-300"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid with masonry-like layout */}
      <div id="collections" className="container mx-auto px-4 py-16">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-16">
          <div className="relative group">
            <Link to={collections[0].link} className="block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={collections[0].image}
                  alt={collections[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">{collections[0].title}</h3>
                  <p className="text-sm mt-2">{collections[0].description}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="relative group md:mt-16">
            <Link to={collections[1].link} className="block">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={collections[1].image}
                  alt={collections[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">{collections[1].title}</h3>
                  <p className="text-sm mt-2">{collections[1].description}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="relative group md:-mt-32">
            <Link to={collections[2].link} className="block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={collections[2].image}
                  alt={collections[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">{collections[2].title}</h3>
                  <p className="text-sm mt-2">{collections[2].description}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="relative group md:mt-16">
            <Link to={collections[3].link} className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={collections[3].image}
                  alt={collections[3].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-[#4A3F35] bg-white/90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-light">{collections[3].title}</h3>
                  <p className="text-sm mt-2">{collections[3].description}</p>
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
