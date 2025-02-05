import React from "react";
import { Link } from "react-router-dom";
import arxaioImage from "../assets/arxaio-kosmima.jpeg";
import eliaImage from "../assets/elia.jpeg";
import pouliaImage from "../assets/poulia.jpeg";
import karaviImage from "../assets/karavi.jpeg";

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: arxaioImage,
      title: "Ancient Jewelry Collection",
      description: "Discover our unique pieces",
      link: "/jewelry",
      featured: true,
    },
    {
      id: 2,
      image: eliaImage,
      title: "Olive Collection",
      description: "Inspired by nature",
      link: "/sculptures",
    },
    {
      id: 3,
      image: pouliaImage,
      title: "Birds Collection",
      description: "Freedom in design",
      link: "/jewelry",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
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
      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Item - Full width on smaller screens, 2 columns on md+ */}
          <div className="md:col-span-2 relative group">
            <Link to={galleryItems[0].link} className="block">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={galleryItems[0].image}
                  alt={galleryItems[0].title}
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-light mb-2">
                    {galleryItems[0].title}
                  </h3>
                  <p className="text-sm">{galleryItems[0].description}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Regular Items */}
          {galleryItems.slice(1).map((item) => (
            <div key={item.id} className="relative group">
              <Link to={item.link} className="block">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-light mb-2">{item.title}</h3>
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
