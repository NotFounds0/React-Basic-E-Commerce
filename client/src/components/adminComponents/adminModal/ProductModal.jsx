import axios from "axios";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductModal = ({
  setModal,
  currentProduct,
  setCurrentProduct,
  onProductUpdate,
}) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [disCount, setDiscount] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (currentProduct) {
      setImg(currentProduct.img || "");
      setName(currentProduct.name || "");
      setDesc(currentProduct.desc || "");
      setCategory(currentProduct.category || "");
      setPrice(currentProduct.price || "");
      setDiscount(currentProduct.disCount || "");
      setStock(currentProduct.stock || "");
    } else {
      setImg("");
      setName("");
      setDesc("");
      setCategory("");
      setPrice("");
      setDiscount("");
      setStock("");
    }
  }, [currentProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img || !name || !desc || !category || !price || !stock) {
      return toast.error("Lütfen tüm alanları doldurduğunuzdan emin olun.");
    }

    const postData = { img, name, desc, category, price, disCount, stock };

    try {
      if (currentProduct) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/update/${currentProduct._id}`,
          postData
        );
        toast.success("Ürün başarıyla güncellendi.");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/products/create`, postData);
        toast.success("Ürün başarıyla eklendi.");
      }
      setModal(false);
      setCurrentProduct(null);
      onProductUpdate();
    } catch (error) {
      toast.error("Bir şeyler ters gitti.");
      console.log(error);
    }
  };

  function handleClose() {
    setModal(false);
    setCurrentProduct(null);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {currentProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Resim URL
            </label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ürün Adı
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Açıklama
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Tüm Kategoriler</option>
              <option value="Electronic">Elektronik</option>
              <option value="Giyim">Giyim</option>
              <option value="Spor">Spor</option>
              <option value="Ev">Ev</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fiyat
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              İndirim
            </label>
            <input
              value={disCount}
              onChange={(e) => setDiscount(e.target.value)}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Stok
            </label>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              İptal
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {currentProduct ? "Güncelle" : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
