import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import karaviImage from "../assets/tei.jpeg"; // Reusing the ship image as background
import artistPhoto from "../assets/arxaio-kosmima.jpeg"; // Placeholder for artist photo - replace with actual artist image
import eliaImage from "../assets/elia.jpeg"; // Placeholder for studio image
import artworkImage from "../assets/poulia.jpeg"; // Placeholder for artwork image
import studioImage from "../assets/elia.jpeg"; // Placeholder for studio image

const About = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const bioRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 overflow-hidden">
      {/* Hero Section with Parallax */}
      <div
        className="h-screen bg-cover bg-center bg-no-repeat relative flex items-center"
        style={{
          backgroundImage: `url(${karaviImage})`,
          backgroundPosition: `center ${scrollPosition * 0.5}px`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-6">
              Stelios Diamantakis
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 opacity-90 leading-relaxed">
              Artist • Sculptor • Jewelry Designer
            </p>
            <div className="w-16 h-1 bg-white/60 mx-auto mb-12"></div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-light italic">
              "Some people are born with stars, but others create stars and make
              people dream."
            </p>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <section ref={bioRef} className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-16">
              {/* Artist photo */}
              <div
                className="w-full md:w-2/5 mb-12 md:mb-0 relative rounded-lg overflow-hidden"
                style={{
                  opacity: Math.min(1, (scrollPosition + 200) / 700),
                  transform: `translateY(${Math.min(
                    (scrollPosition - 100) * 0.05,
                    0
                  )}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <img
                  src={artistPhoto}
                  alt="Stelios Diamantakis"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>

              {/* Biography text */}
              <div
                className="w-full md:w-3/5"
                style={{
                  opacity: Math.min(1, (scrollPosition + 300) / 700),
                  transform: `translateX(${Math.min(
                    (scrollPosition - 200) * 0.1,
                    0
                  )}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <h2 className="text-3xl md:text-4xl font-light text-[#4A3F35] mb-8 tracking-wide">
                  The Artist
                </h2>
                <div className="prose prose-lg text-[#4A3F35]/90 font-light leading-relaxed space-y-6 max-w-none">
                  <p>
                    Stelios Diamantakis was born in Nea Triglia, Chalkidiki in
                    1961. His birthplace serves as a constant source of
                    inspiration throughout his creative journey.
                  </p>
                  <p>
                    He studied economics while simultaneously pursuing design
                    and handcrafted Byzantine jewelry making. He is a graduate
                    of the School of Fine Arts at the University of Western
                    Macedonia. His education combined art with tradition,
                    strengthening his artistic dialogue and the profound
                    thoughtfulness of his work.
                  </p>
                  <p>
                    Alongside jewelry, his creations have expanded in volume and
                    form, leading him to incorporate materials beyond gold and
                    silver, such as copper, bronze, iron, stone, and wood.
                  </p>
                  <p>
                    For the past 25 years, he has worked as a professional metal
                    sculptor in the city of Serres, where he also teaches design
                    and handmade jewelry making at the "Polytechno" arts
                    workshop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work & Exhibitions Section */}
      <section
        className="py-24 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${studioImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-light mb-12 tracking-wide">
              Work & Exhibitions
            </h2>
            <div className="prose prose-lg text-white/90 font-light mx-auto space-y-8 max-w-3xl">
              <p>
                His works can be found in public spaces, museums, institutions,
                as well as in many private collections in Greece and abroad.
              </p>
              <p>
                Stelios Diamantakis has held twelve solo exhibitions and
                participated in numerous group exhibitions throughout his
                career.
              </p>
              <p>
                His current works demonstrate the maturity of a creator who
                doesn't hesitate to venture into bold artistic compositions. The
                result of his journey today, expressed in larger surfaces and
                volumes, testifies to the artistic impulse and courage of the
                creator.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <div className="text-4xl mb-4 font-light">12+</div>
                <div className="text-white/80 uppercase tracking-widest text-sm">
                  Solo Exhibitions
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <div className="text-4xl mb-4 font-light">25+</div>
                <div className="text-white/80 uppercase tracking-widest text-sm">
                  Years Experience
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <div className="text-4xl mb-4 font-light">∞</div>
                <div className="text-white/80 uppercase tracking-widest text-sm">
                  Inspiration Sources
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section ref={galleryRef} className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-light text-center text-[#4A3F35] mb-16 tracking-wide">
              Artistic Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div
                className="overflow-hidden rounded-lg"
                style={{
                  opacity: Math.min(
                    1,
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      400) /
                      500
                  ),
                  transform: `translateY(${Math.min(
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      300) *
                      0.05,
                    20
                  )}px)`,
                }}
              >
                <img
                  src={artworkImage}
                  alt="Artwork process"
                  className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div
                className="flex flex-col justify-center"
                style={{
                  opacity: Math.min(
                    1,
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      500) /
                      500
                  ),
                  transform: `translateX(${Math.min(
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      400) *
                      0.1,
                    0
                  )}px)`,
                }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-[#4A3F35] mb-6">
                  Materials & Techniques
                </h3>
                <p className="text-[#4A3F35]/80 mb-8 font-light leading-relaxed">
                  Alongside jewelry, his creations have expanded in dimension
                  and form. He began incorporating materials beyond gold and
                  silver, exploring copper, bronze, iron, stone, and wood to
                  express his artistic vision.
                </p>
                <p className="text-[#4A3F35]/80 mb-8 font-light leading-relaxed">
                  Sometimes olive branches, sometimes bare trees, straw hats,
                  rendered in copper, iron and other materials, consistently
                  draw the gaze and admiration of art lovers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div
                className="flex flex-col justify-center order-2 md:order-1"
                style={{
                  opacity: Math.min(
                    1,
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      700) /
                      500
                  ),
                  transform: `translateX(${Math.max(
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      600) *
                      -0.1,
                    0
                  )}px)`,
                }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-[#4A3F35] mb-6">
                  Teaching & Sharing
                </h3>
                <p className="text-[#4A3F35]/80 mb-8 font-light leading-relaxed">
                  For over two decades, Stelios has been sharing his knowledge
                  and passion with students at the "Polytechno" arts workshop in
                  Serres, where he teaches design and the craft of handmade
                  jewelry making.
                </p>
                <p className="text-[#4A3F35]/80 mb-8 font-light leading-relaxed">
                  His approach combines traditional techniques with contemporary
                  expressions, encouraging students to find their own artistic
                  voice while honoring craftsmanship.
                </p>
                <Link
                  to="/gallery"
                  className="inline-block px-6 py-3 bg-[#4A3F35] text-white hover:bg-[#5a4f45] transition-colors duration-300 mt-4"
                >
                  Explore Gallery
                </Link>
              </div>
              <div
                className="overflow-hidden rounded-lg order-1 md:order-2"
                style={{
                  opacity: Math.min(
                    1,
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      800) /
                      500
                  ),
                  transform: `translateY(${Math.min(
                    (scrollPosition -
                      (galleryRef.current?.offsetTop || 0) +
                      700) *
                      0.05,
                    20
                  )}px)`,
                }}
              >
                <img
                  src={eliaImage}
                  alt="Teaching workshop"
                  className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center text-[#4A3F35] mb-20 tracking-wide">
            Artistic Recognition
          </h2>

          <div className="max-w-4xl mx-auto">
            <div
              className="bg-white p-12 rounded-lg shadow-sm mb-16 relative"
              style={{
                opacity: Math.min(
                  1,
                  (scrollPosition -
                    (testimonialsRef.current?.offsetTop || 0) +
                    300) /
                    400
                ),
              }}
            >
              <svg
                className="w-12 h-12 text-[#4A3F35]/10 absolute top-8 left-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className="relative">
                <p className="text-[#4A3F35] mb-6 font-light leading-relaxed text-lg italic">
                  "Works that today impart the maturity of the creator who
                  doesn't hesitate and proceeds to bold artistic compositions.
                  The result of his journey today, expressed in larger surfaces
                  and volumes, testifies to the artistic impulse and courage of
                  the creator."
                </p>
                <div className="flex items-center">
                  <div>
                    <p className="text-[#4A3F35] font-medium">Alkinoe Mos</p>
                    <p className="text-[#4A3F35]/60 text-sm">Art Critic</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-12 rounded-lg shadow-sm relative"
              style={{
                opacity: Math.min(
                  1,
                  (scrollPosition -
                    (testimonialsRef.current?.offsetTop || 0) +
                    500) /
                    400
                ),
              }}
            >
              <svg
                className="w-12 h-12 text-[#4A3F35]/10 absolute top-8 left-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className="relative">
                <p className="text-[#4A3F35] mb-6 font-light leading-relaxed text-lg italic">
                  "Some people are born with stars, but others create stars and
                  make people dream. He contemplates and makes others
                  contemplate. Sometimes olive branches, sometimes bare trees,
                  straw hats, rendered in copper, iron and other materials,
                  consistently draw the gaze and admiration of art lovers. I
                  wish him creative inspiration and joy for life as he knows how
                  to give to his own people and beyond."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#4A3F35] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-8 tracking-wide">
              Connect with the Artist
            </h2>
            <p className="text-white/80 font-light mb-12 max-w-2xl mx-auto">
              Stelios Diamantakis lives and works in Serres, Greece. For
              inquiries about exhibitions, commissions, or the "Polytechno" arts
              workshop, please get in touch.
            </p>

            <div className="inline-flex gap-6">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-[#4A3F35] hover:bg-stone-200 transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                to="/gallery"
                className="px-8 py-4 border border-white text-white hover:bg-white hover:text-[#4A3F35] transition-colors duration-300"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
