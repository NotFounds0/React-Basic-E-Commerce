import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="E-ticaret Hero"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Yeni Sezon Ürünleri
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          En yeni ürünlerimizi keşfedin ve tarzınızı yansıtın. Kalite ve şıklık
          bir arada.
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Alışverişe Başla
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
