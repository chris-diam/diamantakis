import axios from "axios";

const api = axios.create({
  baseURL: "https://diamantakis-server.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchArtworks = async () => {
  const response = await api.get("/artworks");
  return response.data;
};

export const fetchArtworkById = async (id) => {
  const response = await api.get(`/artworks/${id}`);
  return response.data;
};

export default api;
