import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import arxaioImage from "../assets/arxaio-kosmima.jpeg";
import eliaImage from "../assets/elia.jpeg";
import pouliaImage from "../assets/matomeno-pasxa.jpeg";
import karaviImage from "../assets/karavi.jpeg";

const Gallery = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const collectionsRef = useRef(null);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position for parallax effects, only if not mobile
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setScrollPosition(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const collections = [
    {
      id: 1,
      image: arxaioImage,
      title: "Jewelry",
      description: "DISCOVER THE COLLECTION",
      link: "/jewelry",
      details:
        "Handcrafted with precision and love, our ring collection showcases timeless elegance with a modern twist.",
    },
    {
      id: 2,
      image: eliaImage,
      title: "Sculpture Collection",
      description: "INSPIRED BY NATURE",
      link: "/sculptures",
      details:
        "A celebration of Greek heritage, our olive collection brings the symbol of peace and prosperity to your home.",
    },
    {
      id: 3,
      image: pouliaImage,
      title: "Painting collection",
      description: "FREEDOM IN DESIGN",
      link: "/paintings",
      details:
        "Capturing the grace and elegance of birds in flight, each piece is a testament to freedom and natural beauty.",
    },
  ];

  // Scroll to collections section
  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-hidden">
      {/* Hero Section with Parallax - responsive height for mobile */}
      <div
        ref={heroRef}
        className="min-h-[500px] h-[90vh] md:h-screen bg-cover rounded bg-center bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: `url(${karaviImage})`,
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-2xl mx-auto transform translate-y-0 md:translate-y-[-30px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-wider mb-4 md:mb-6">
              Welcome to Our Gallery
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 md:mb-12 opacity-90">
              Discover Our Unique Collection
            </p>
            <button
              onClick={scrollToCollections}
              className="px-6 py-3 md:px-8 md:py-4 border border-white text-white hover:bg-white hover:text-[#4A3F35] transition-all duration-300 text-base md:text-lg tracking-wide"
            >
              Explore Collections
            </button>
          </div>
        </div>

        {/* Scroll indicator - hidden on smaller screens */}
        <div className="absolute bottom-8 left-0 right-0 hidden md:flex justify-center animate-bounce">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Main content - Collection showcase with responsive spacing */}
      <div ref={collectionsRef} className="py-12 md:py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-light text-[#4A3F35] mb-10 md:mb-20">
            OUR COLLECTIONS
          </h2>

          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } 
                items-center mb-16 sm:mb-24 md:mb-32 lg:mb-40 last:mb-8 last:md:mb-16 overflow-hidden`}
            >
              {/* Image container with responsive height and conditional parallax */}
              <div
                className="w-full md:w-7/12 mb-8 md:mb-0 relative overflow-hidden rounded-lg"
                style={{
                  height: isMobile ? "300px" : "50vh",
                  maxHeight: isMobile ? "400px" : "700px",
                  transform: !isMobile
                    ? `translateY(${Math.min(
                        (scrollPosition -
                          (collectionsRef.current?.offsetTop || 0) +
                          index * 400) *
                          0.1,
                        100
                      )}px)`
                    : "none",
                  opacity: !isMobile
                    ? Math.min(
                        1,
                        (scrollPosition -
                          (collectionsRef.current?.offsetTop || 0) +
                          index * 600 +
                          300) /
                          500
                      )
                    : 1,
                  transition: !isMobile ? "transform 0.3s ease-out" : "none",
                }}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text container with responsive spacing and conditional animations */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? "md:pl-8 lg:pl-16" : "md:pr-8 lg:pr-16"
                } 
                  transform transition-all duration-700 mt-4 md:mt-0`}
                style={{
                  opacity: !isMobile
                    ? Math.min(
                        1,
                        (scrollPosition -
                          (collectionsRef.current?.offsetTop || 0) +
                          index * 600 +
                          500) /
                          500
                      )
                    : 1,
                  transform: !isMobile
                    ? `translateX(${
                        index % 2 === 0
                          ? Math.min(
                              (scrollPosition -
                                (collectionsRef.current?.offsetTop || 0) +
                                index * 500) *
                                0.1,
                              0
                            )
                          : Math.max(
                              (scrollPosition -
                                (collectionsRef.current?.offsetTop || 0) +
                                index * 500) *
                                -0.1,
                              0
                            )
                      }px)`
                    : "none",
                }}
              >
                <span className="block text-xs sm:text-sm tracking-widest text-[#4A3F35] mb-2 sm:mb-4">
                  {collection.description}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#4A3F35] mb-3 sm:mb-6 tracking-wide">
                  {collection.title}
                </h3>
                <p className="text-[#4A3F35]/80 mb-6 sm:mb-8 font-light leading-relaxed text-sm sm:text-base">
                  {collection.details}
                </p>
                <Link
                  to={collection.link}
                  className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#4A3F35] text-white hover:bg-[#5a4f45] transition-colors duration-300 text-sm sm:text-base"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action section with responsive text and proper mobile background attachment */}
      <div
        className="py-16 md:py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${karaviImage})`,
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-8 max-w-4xl mx-auto">
            Discover the Artistry Behind Each Collection
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto font-light">
            Each piece tells a story of craftsmanship, heritage, and timeless
            beauty
          </p>
          <Link
            to="/about"
            className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#4A3F35] hover:bg-[#4A3F35] hover:text-white transition-colors duration-300 text-base sm:text-lg"
          >
            Learn Our Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
