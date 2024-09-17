import React, { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiHeart,
  FiBell,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const LogUserToken = localStorage.getItem("userData");
  const userID = localStorage.getItem("userID");
  const isLoggedIn = !!LogUserToken;
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const nav = useNavigate();

  // API'den ürün verilerini çekme
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/get");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("API'den veri çekme hatası:", error);
      }
    };
    fetchProducts();
  }, []);

  // Arama sonuçlarını filtreleme
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = products.filter((product) =>
        product.name
          ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      );
      setFilteredProducts(filtered.slice(0, 5));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm, products]);

  // Eşleşen kısımları vurgulama fonksiyonu
  const highlightMatch = (name, searchTerm) => {
    const parts = name.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  // Dışarı tıklamayı yakalama
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProductDetailClick = (id) => {
    nav(`/productDetail/${id}`);
  };

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className={`text-gray-600 hover:text-teal-600 transition duration-300 relative group ${
        activeLink === href ? "text-teal-600" : ""
      }`}
      onClick={() => setActiveLink(href)}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </a>
  );

  return (
    <header className="bg-white shadow-md">
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold transform hover:scale-105 transition duration-300 flex-shrink-0 mr-4"
          >
            <span className="text-teal-600">E-</span>
            <span className="text-gray-800">Mağaza</span>
          </a>

          {/* Search bar */}
          <div
            className="flex-grow order-3 sm:order-2 mt-4 sm:mt-0 w-full sm:w-auto sm:mx-4 lg:mx-10 relative"
            ref={searchRef}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 px-4 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
            </div>
            {showResults && (
              <div className="absolute top-12 left-0 w-full bg-white shadow-lg z-10 max-h-60 overflow-y-auto rounded-lg">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleProductDetailClick(product._id)}
                      className="block py-2 hover:bg-gray-100 transition duration-300 cursor-pointer border w-full"
                    >
                      {highlightMatch(product.name, searchTerm)}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2 text-white text-center rounded-lg bg-red-300">
                    Ürün bulunamadı
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation and Icons */}
          <div className="flex items-center space-x-4 order-2 sm:order-3 ml-auto sm:ml-0">
            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex space-x-6">
              <NavLink href="/">Ana Sayfa</NavLink>
              <NavLink href="/products">Ürünler</NavLink>
              <NavLink href="/hakkimizda">Hakkımızda</NavLink>
              <NavLink href="/iletisim">İletişim</NavLink>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <FiBell className="text-gray-600 hover:text-teal-600 cursor-pointer transition duration-300 transform hover:scale-110" />
              <FiHeart className="text-gray-600 hover:text-teal-600 cursor-pointer transition duration-300 transform hover:scale-110" />
              <a href="/sepet">
                <div className="relative group">
                  <FiShoppingCart className="text-gray-600 group-hover:text-teal-600 cursor-pointer transition duration-300 transform group-hover:scale-110" />
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center group-hover:animate-bounce">
                    {cart.items.length}
                  </span>
                </div>
              </a>
              <div>
                {isLoggedIn ? (
                  <a
                    href={`/profile/${userID}`}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300 group"
                  >
                    <div className="relative flex items-center">
                      <FiUser
                        className="text-gray-600 group-hover:text-teal-600 cursor-pointer transition duration-300 transform group-hover:scale-110"
                        size={24}
                      />
                    </div>
                    <span className="font-semibold text-gray-800">
                      {LogUserToken}
                    </span>
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="text-white px-8 py-2 rounded-lg hover:bg-transparent border border-teal-500 hover:text-gray-500 transition duration-300 bg-teal-500"
                  >
                    Giriş Yap
                  </a>
                )}
              </div>
              <button
                className="lg:hidden text-gray-600 hover:text-teal-600 transition duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FiX className="text-2xl" />
                ) : (
                  <FiMenu className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
