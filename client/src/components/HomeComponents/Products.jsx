import { useState, useEffect } from "react";
import ProductCard from "./ProductCards";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/get`);
        const data = res.data;
        console.log("Fetched products:", data);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [category, searchTerm, products]);

  const handleProductDetailClick = (id) => {
    nav(`/productDetail/${id}`);
  };

  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto px-4 py-12">
        <h2
          className="text-4xl font-bold mb-8 text-center text-gray-800"
          data-aos="fade-down"
        >
          Ürünlerimiz
        </h2>

        <div
          className="flex flex-col md:flex-row justify-between items-center mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            className="w-full md:w-1/3 mb-4 md:mb-0"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Ürün ara..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div
            className="w-full md:w-1/3"
            data-aos="fade-left"
            data-aos-delay="600"
          >
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">Tüm Kategoriler</option>
              <option value="Electronic">Elektronik</option>
              <option value="Giyim">Giyim</option>
              <option value="Spor">Spor</option>
              <option value="Ev">Ev</option>
            </select>
          </div>
        </div>
        <div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-4 bg-red-100 text-red-700 rounded">
                <h1>Ürün Bulunamadı</h1>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} data-aos="zoom-in" data-aos-delay={200}>
                  <ProductCard
                    product={product}
                    pDetailClick={handleProductDetailClick}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
