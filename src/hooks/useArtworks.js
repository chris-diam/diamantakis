// src/hooks/useArtworks.js
import { useState, useEffect } from "react";

const useArtworks = (category = null) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const url =
          category && category !== "all"
            ? `https://diamantakis-server.onrender.com/api/v1/artworks?category=${category}`
            : "https://diamantakis-server.onrender.com/api/v1/artworks";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch artworks");

        const data = await response.json();
        setArtworks(data.data.artworks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [category]);

  return { artworks, loading, error };
};

export default useArtworks;
