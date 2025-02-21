// src/components/Search.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Search as SearchIcon,
  X,
  Filter,
  History,
  SortAsc,
  Clock,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Search = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allResults, setAllResults] = useState([]); // Store all fetched results
  const [filteredResults, setFilteredResults] = useState([]); // Store filtered results
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [sortBy, setSortBy] = useState("newest");
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("searchHistory") || "[]");
  });
  const [showHistory, setShowHistory] = useState(false);
  const [materialFilter, setMaterialFilter] = useState([]);
  const [dimensionRange, setDimensionRange] = useState({
    width: { min: "", max: "" },
    height: { min: "", max: "" },
  });
  const [networkError, setNetworkError] = useState(false);

  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  const categories = ["all", "painting", "sculpture", "jewelry"];
  const materials = ["canvas", "oil", "marble", "bronze", "gold", "silver"];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "nameAsc", label: "Name: A to Z" },
    { value: "nameDesc", label: "Name: Z to A" },
  ];

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToSearchHistory = (term) => {
    if (!term.trim()) return;
    setSearchHistory((prev) => {
      const newHistory = [term, ...prev.filter((t) => t !== term)].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
    setShowHistory(false);
  };

  const handleResultClick = (artwork) => {
    addToSearchHistory(searchTerm);
    navigate(`/artwork/${artwork._id}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (showHistory && searchHistory.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex =
            e.key === "ArrowDown"
              ? Math.min(prev + 1, searchHistory.length - 1)
              : Math.max(prev - 1, 0);
          return newIndex;
        });
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        setSearchTerm(searchHistory[selectedIndex]);
        setShowHistory(false);
        setSelectedIndex(-1);
      }
    } else if (filteredResults.length > 0) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex =
            e.key === "ArrowDown"
              ? Math.min(prev + 1, filteredResults.length - 1)
              : Math.max(prev - 1, 0);
          return newIndex;
        });
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        handleResultClick(filteredResults[selectedIndex]);
      }
    }

    if (e.key === "Escape") {
      if (showHistory) {
        setShowHistory(false);
      } else {
        onClose();
      }
    }
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    setMaterialFilter([]);
    setDimensionRange({
      width: { min: "", max: "" },
      height: { min: "", max: "" },
    });
    setSortBy("newest");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      searchRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
      setSearchTerm("");
      setSelectedIndex(-1);
      setShowHistory(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fetch data with CORS handling and caching
  useEffect(() => {
    // Key part to fix - don't send search term to the server at all
    // Replace your entire fetchResults function with this:

    const fetchResults = async () => {
      setLoading(true);
      setNetworkError(false);

      try {
        // Only try to fetch data once per session to avoid rate limiting
        // Check if we already have data in sessionStorage
        const sessionData = sessionStorage.getItem("artworks_data");

        if (sessionData) {
          console.log("Using cached session data");
          const parsedData = JSON.parse(sessionData);
          setAllResults(parsedData);
          setLoading(false);
          return;
        }

        // If no cached data, make one clean request without any parameters
        let url = new URL(
          "https://diamantakis-server.onrender.com/api/v1/artworks"
        );

        // IMPORTANT: DO NOT add any search parameters to avoid CORS
        // Let params be empty - we'll filter client-side

        try {
          console.log("Fetching all artworks without parameters");
          const response = await fetch(url, {
            mode: "cors",
            credentials: "omit",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }

          const data = await response.json();

          if (!data.data || !Array.isArray(data.data.artworks)) {
            throw new Error("Invalid data format from server");
          }

          // Cache the data in sessionStorage to avoid repeated requests
          sessionStorage.setItem(
            "artworks_data",
            JSON.stringify(data.data.artworks)
          );

          // Set all results
          setAllResults(data.data.artworks);
        } catch (fetchError) {
          console.error("Fetch error:", fetchError);
          setNetworkError(true);

          // Fallback to empty results
          setAllResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setNetworkError(true);
        setAllResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Call this function only once when the component mounts
    useEffect(() => {
      fetchResults();
      // No dependencies - only call once
    }, []);

    // All filtering happens client-side only
    useEffect(() => {
      if (!allResults.length) return;

      // Apply all filters client-side
      let filtered = [...allResults];

      // Apply search term filter
      if (searchTerm.trim()) {
        const normalizedTerm = searchTerm.toLowerCase().trim();
        filtered = filtered.filter((artwork) => {
          return (
            (artwork.title &&
              artwork.title.toLowerCase().includes(normalizedTerm)) ||
            (artwork.description &&
              artwork.description.toLowerCase().includes(normalizedTerm)) ||
            (artwork.category &&
              artwork.category.toLowerCase().includes(normalizedTerm)) ||
            (artwork.materials &&
              Array.isArray(artwork.materials) &&
              artwork.materials.some((m) =>
                m.toLowerCase().includes(normalizedTerm)
              ))
          );
        });
      }

      // Other filters (category, price, materials, dimensions)
      if (selectedCategory !== "all") {
        filtered = filtered.filter(
          (artwork) =>
            artwork.category &&
            artwork.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // Price filter
      if (priceRange.min) {
        filtered = filtered.filter(
          (artwork) => artwork.price >= parseInt(priceRange.min, 10)
        );
      }
      if (priceRange.max) {
        filtered = filtered.filter(
          (artwork) => artwork.price <= parseInt(priceRange.max, 10)
        );
      }

      // Material filter
      if (materialFilter.length > 0) {
        filtered = filtered.filter(
          (artwork) =>
            artwork.materials &&
            materialFilter.some((material) =>
              artwork.materials
                .map((m) => m.toLowerCase())
                .includes(material.toLowerCase())
            )
        );
      }

      // Dimension filters
      if (dimensionRange.width.min) {
        filtered = filtered.filter(
          (artwork) =>
            artwork.dimensions &&
            artwork.dimensions.width >= parseInt(dimensionRange.width.min, 10)
        );
      }
      if (dimensionRange.width.max) {
        filtered = filtered.filter(
          (artwork) =>
            artwork.dimensions &&
            artwork.dimensions.width <= parseInt(dimensionRange.width.max, 10)
        );
      }
      if (dimensionRange.height.min) {
        filtered = filtered.filter(
          (artwork) =>
            artwork.dimensions &&
            artwork.dimensions.height >= parseInt(dimensionRange.height.min, 10)
        );
      }
      if (dimensionRange.height.max) {
        filtered = filtered.filter(
          (artwork) =>
            artwork.dimensions &&
            artwork.dimensions.height <= parseInt(dimensionRange.height.max, 10)
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "nameAsc":
            return (a.title || "").localeCompare(b.title || "");
          case "nameDesc":
            return (b.title || "").localeCompare(a.title || "");
          case "newest":
          default:
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
      });

      setFilteredResults(filtered);
      setSelectedIndex(-1);
    }, [
      searchTerm,
      allResults,
      selectedCategory,
      priceRange,
      materialFilter,
      dimensionRange,
      sortBy,
    ]);

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, priceRange, materialFilter, dimensionRange, sortBy]);

  // Client-side search filtering effect
  useEffect(() => {
    const fetchAllArtworks = async () => {
      setLoading(true);
      setNetworkError(false);

      try {
        // Check if we already have data in sessionStorage
        const sessionData = sessionStorage.getItem("artworks_data");

        if (sessionData) {
          console.log("Using cached session data");
          const parsedData = JSON.parse(sessionData);
          setAllResults(parsedData);
          setLoading(false);
          return;
        }

        // If no cached data, make one clean request without any parameters
        let url = new URL(
          "https://diamantakis-server.onrender.com/api/v1/artworks"
        );

        // IMPORTANT: DO NOT add any search parameters to avoid CORS

        const response = await fetch(url, {
          mode: "cors",
          credentials: "omit",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Cache the data in sessionStorage
        sessionStorage.setItem(
          "artworks_data",
          JSON.stringify(data.data.artworks)
        );

        // Set all results
        setAllResults(data.data.artworks);
      } catch (error) {
        console.error("Fetch error:", error);
        setNetworkError(true);
        setAllResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArtworks();
  }, []); // Empty dependency array - only run once when component mounts

  // All filtering happens client-side in a separate effect
  useEffect(() => {
    if (!allResults.length) return;

    // Filter the data client-side based on all criteria
    let filtered = [...allResults];

    // Search term filtering
    if (searchTerm.trim()) {
      const normalizedTerm = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((artwork) => {
        return (
          (artwork.title &&
            artwork.title.toLowerCase().includes(normalizedTerm)) ||
          (artwork.description &&
            artwork.description.toLowerCase().includes(normalizedTerm)) ||
          (artwork.category &&
            artwork.category.toLowerCase().includes(normalizedTerm)) ||
          (artwork.materials &&
            Array.isArray(artwork.materials) &&
            artwork.materials.some((m) =>
              m.toLowerCase().includes(normalizedTerm)
            ))
        );
      });
    }

    // Apply category filter (if not already applied server-side)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (artwork) =>
          artwork.category &&
          artwork.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price filter (if not already applied server-side)
    if (priceRange.min) {
      filtered = filtered.filter(
        (artwork) => artwork.price >= parseInt(priceRange.min, 10)
      );
    }
    if (priceRange.max) {
      filtered = filtered.filter(
        (artwork) => artwork.price <= parseInt(priceRange.max, 10)
      );
    }

    // Apply material filter
    if (materialFilter.length > 0) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.materials &&
          materialFilter.some((material) =>
            artwork.materials
              .map((m) => m.toLowerCase())
              .includes(material.toLowerCase())
          )
      );
    }

    // Apply dimension filters
    if (dimensionRange.width.min) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.dimensions &&
          artwork.dimensions.width >= parseInt(dimensionRange.width.min, 10)
      );
    }
    if (dimensionRange.width.max) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.dimensions &&
          artwork.dimensions.width <= parseInt(dimensionRange.width.max, 10)
      );
    }
    if (dimensionRange.height.min) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.dimensions &&
          artwork.dimensions.height >= parseInt(dimensionRange.height.min, 10)
      );
    }
    if (dimensionRange.height.max) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.dimensions &&
          artwork.dimensions.height <= parseInt(dimensionRange.height.max, 10)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "nameAsc":
          return (a.title || "").localeCompare(b.title || "");
        case "nameDesc":
          return (b.title || "").localeCompare(a.title || "");
        case "newest":
        default:
          // Assuming createdAt is a date string or timestamp
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    setFilteredResults(filtered);
    setSelectedIndex(-1);
  }, [
    searchTerm,
    allResults,
    selectedCategory,
    priceRange,
    materialFilter,
    dimensionRange,
    sortBy,
  ]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <div className="fixed inset-x-0 top-0 bg-white shadow-lg max-h-screen overflow-hidden">
          <div className="container mx-auto p-4">
            {/* Search Bar */}
            <div className="relative flex items-center mb-4">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowHistory(true);
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-32 py-3 border-b-2 border-[#C5B073] focus:outline-none text-lg"
              />
              <div className="absolute right-0 flex items-center space-x-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 text-gray-400 hover:text-[#C5B073]"
                  title="Search History"
                >
                  <History size={20} />
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 transition-colors ${
                    showFilters
                      ? "text-[#C5B073]"
                      : "text-gray-400 hover:text-[#C5B073]"
                  }`}
                  title="Filters"
                >
                  <Filter size={20} />
                </button>
                <button
                  onClick={() =>
                    setSortBy(sortBy === "newest" ? "priceAsc" : "newest")
                  }
                  className="p-2 text-gray-400 hover:text-[#C5B073]"
                  title="Sort"
                >
                  <SortAsc size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-red-500"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Network Error Notice */}
            {networkError && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-amber-800 text-sm">
                  There was an issue connecting to the server. Search results
                  may be limited or unavailable.
                </p>
              </div>
            )}

            {/* Search History */}
            {showHistory && searchHistory.length > 0 && (
              <div className="absolute z-50 left-0 right-0 bg-white shadow-lg rounded-lg mt-1 border">
                <div className="p-3 flex justify-between items-center border-b">
                  <span className="text-sm font-medium text-gray-700">
                    Recent Searches
                  </span>
                  <button
                    onClick={clearSearchHistory}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Clear History
                  </button>
                </div>
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
                      selectedIndex === index ? "bg-gray-50" : ""
                    }`}
                    onClick={() => {
                      setSearchTerm(term);
                      setShowHistory(false);
                    }}
                  >
                    <Clock size={16} className="text-gray-400 mr-2" />
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-700">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-[#C5B073] hover:text-[#4A3F35] flex items-center"
                  >
                    <RotateCcw size={14} className="mr-1" />
                    Reset Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Category and Sort */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range (€)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange((prev) => ({
                            ...prev,
                            min: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                        min="0"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange((prev) => ({
                            ...prev,
                            max: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Materials
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {materials.map((material) => (
                        <label key={material} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={materialFilter.includes(material)}
                            onChange={(e) => {
                              setMaterialFilter((prev) =>
                                e.target.checked
                                  ? [...prev, material]
                                  : prev.filter((m) => m !== material)
                              );
                            }}
                            className="rounded border-gray-300 text-[#C5B073] focus:ring-[#C5B073]"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {material.charAt(0).toUpperCase() +
                              material.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Dimensions */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dimensions (cm)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Width
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={dimensionRange.width.min}
                            onChange={(e) =>
                              setDimensionRange((prev) => ({
                                ...prev,
                                width: { ...prev.width, min: e.target.value },
                              }))
                            }
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                            min="0"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={dimensionRange.width.max}
                            onChange={(e) =>
                              setDimensionRange((prev) => ({
                                ...prev,
                                width: { ...prev.width, max: e.target.value },
                              }))
                            }
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                            min="0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Height
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={dimensionRange.height.min}
                            onChange={(e) =>
                              setDimensionRange((prev) => ({
                                ...prev,
                                height: { ...prev.height, min: e.target.value },
                              }))
                            }
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                            min="0"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={dimensionRange.height.max}
                            onChange={(e) =>
                              setDimensionRange((prev) => ({
                                ...prev,
                                height: { ...prev.height, max: e.target.value },
                              }))
                            }
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#C5B073]"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            <div
              className="mt-4 max-h-[calc(100vh-200px)] overflow-y-auto"
              ref={resultsRef}
            >
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#C5B073] border-t-transparent"></div>
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredResults.map((artwork, index) => (
                    <div
                      key={artwork._id}
                      onClick={() => handleResultClick(artwork)}
                      className={`group cursor-pointer transition-all duration-200 ${
                        selectedIndex === index ? "ring-2 ring-[#C5B073]" : ""
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="aspect-square">
                          <img
                            src={`data:${artwork.images[0].contentType};base64,${artwork.images[0].data}`}
                            alt={artwork.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/400x400/E5DED5/4A3F35?text=Image+Unavailable";
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="font-medium text-[#4A3F35]">
                            {artwork.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {artwork.category}
                          </p>
                          <p className="text-[#C5B073] font-medium mt-1">
                            €{artwork.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchTerm ||
                selectedCategory !== "all" ||
                materialFilter.length > 0 ||
                priceRange.min ||
                priceRange.max ||
                dimensionRange.width.min ||
                dimensionRange.width.max ||
                dimensionRange.height.min ||
                dimensionRange.height.max ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg mb-2">No results found</p>
                  <p className="text-sm">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
