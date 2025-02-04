import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";
import Sculptures from "./pages/Sculptures";
import Jewelry from "./pages/Jewelry";
import Paintings from "./pages/Paintings";
import Contact from "./pages/Contact";
import ArtworkDetail from "./pages/ArtworkDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sculptures" element={<Sculptures />} />
            <Route path="/jewelry" element={<Jewelry />} />
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
