// src/pages/Paintings.jsx
import React from "react";
import ArtworkCard from "../components/ArtworkCard";

const Paintings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Paintings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add ArtworkCards here when data is available */}
      </div>
    </div>
  );
};

export default Paintings;
