import { useState, useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import ProductCard from "../components/HomeComponents/ProductCards";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/products/get"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const categories = [
    "Tümü",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "Tümü" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleProductDetailClick = (id) => {
    nav(`/productDetail/${id}`);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Ürünlerimiz</h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Ürün ara..."
            className="p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          {loading ? (
            <div className="text-center">Yükleniyor...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-4 bg-red-100 text-red-700 rounded">
              <h1>Ürün Bulunamadı</h1>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  pDetailClick={handleProductDetailClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
