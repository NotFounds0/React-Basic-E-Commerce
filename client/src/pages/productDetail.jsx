import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { addProducts } from "../redux/reducer/cartSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [getProductsDetail, setGetProductsDetail] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/get/${id}`
        );
        const data = res.data;
        setGetProductsDetail(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [id]);

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      Swal.fire({
        title: "Ürünü Satın Almak İçin Giriş Yapınız.",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Giriş Yap",
        cancelButtonText: "Kayıt Ol",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "/register";
        }
      });
    } else {
      if (getProductsDetail) {
        const productToAdd = { ...getProductsDetail, quantity };
        dispatch(addProducts(productToAdd));
        toast.success("Ürün Ekleme Başarılı");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 my-10 ">
        {getProductsDetail ? (
          <div className="flex flex-col md:flex-row bg-whites shadow-xl shadow-gray-500 rounded-lg overflow-hidden relative py-10">
            <div className="md:w-2/5 p-4">
              <div className="relative">
                <img
                  src={getProductsDetail.img}
                  alt="Product"
                  className="w-full h-auto max-w-sm mx-auto transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  En iyi taksitli fiyat
                </span>
              </div>
            </div>
            <div className="md:w-3/5 p-4">
              <h1 className="text-3xl font-bold mb-4">
                {getProductsDetail.name}
              </h1>
              {getProductsDetail.stock > 10 ? (
                <p className="text-gray-600 mb-4 absolute bottom-2 right-4">
                  Stok Durumu:{" "}
                  <span className="text-green-600 font-bold">
                    {getProductsDetail.stock}
                  </span>{" "}
                  adet
                </p>
              ) : (
                <p className="text-gray-600 mb-4 absolute bottom-2 right-4">
                  Ürün Stoğu Tükenmek Üzere:{" "}
                  <span className="text-red-600 font-bold">
                    {getProductsDetail.stock}
                  </span>{" "}
                  adet kaldı
                </p>
              )}
              {getProductsDetail.disCount ? (
                <div className="flex items-center mb-4">
                  <span className="text-2xl text-green-600 font-bold">
                    {getProductsDetail.disCount}₺
                  </span>
                  <span className="text-gray-500 line-through ml-4">
                    {getProductsDetail.price}₺
                  </span>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <span className="text-gray-500 text-2xl font-bold">
                    {getProductsDetail.price}₺
                  </span>
                </div>
              )}

              <p className="text-gray-600 mb-4">{getProductsDetail.desc}</p>

              <div className="flex space-x-4 mb-4">
                <button
                  className="bg-orange-500 text-white px-6 py-3 rounded transition-transform duration-300 hover:scale-105"
                  onClick={handleAddToCart}
                >
                  Sepete Ekle
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded transition-transform duration-300 hover:scale-105">
                  <FaHeart className="text-red-500" />
                </button>
                <div className="relative">
                  <button
                    onClick={toggleShareOptions}
                    className="border border-gray-300 px-4 h-full rounded transition-transform duration-300 hover:scale-105"
                  >
                    <FaShare className="text-blue-500" />
                  </button>
                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg transition-opacity duration-300 opacity-100">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        <FaFacebook className="text-blue-600 mr-2" /> Facebook
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        <FaTwitter className="text-blue-400 mr-2" /> Twitter
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                      >
                        <FaInstagram className="text-pink-500 mr-2" /> Instagram
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
