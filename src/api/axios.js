import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
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
