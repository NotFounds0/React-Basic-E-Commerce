import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import ProductModal from "./adminModal/ProductModal";
import Loading from "../Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductsContent = () => {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products/get");
      if (res.status === 200) {
        setTimeout(() => {
          setProducts(res.data);
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setModal(true);
  };

  const handleAdd = () => {
    setCurrentProduct(null);
    setModal(true);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Silmek İstediğine Emin misin?",
        text: "Ürünü Silmek İstediğine Emin misin!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Silindi!",
            text: "Başarıyla Ürün Silindi.",
            icon: "success",
          });
          await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
          const res = await axios.get("http://localhost:5000/api/products/get");
          if (res.status === 200) {
            setProducts(res.data);
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDetail = (id) => {
    nav(`/productDetail/${id}`);
  };
  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Ürünler</h2>
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={handleAdd}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
              >
                <FaPlus className="mr-2" /> Yeni Ürün Ekle
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Resim</th>
                  <th className="p-3 text-left">Başlık</th>
                  <th className="p-3 text-left">Açıklama</th>
                  <th className="p-3 text-left">Kategori</th>
                  <th className="p-3 text-left">Fiyat</th>
                  <th className="p-3 text-left">İndirim</th>
                  <th className="p-3 text-left">Stok</th>
                  <th className="p-3 text-left">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr className="bg-red-500 ">
                    <td className="text-white">Ürün Bulunamadı</td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.desc}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.price}₺</td>
                      <td className="p-3">
                        {p.disCount ? (
                          <span>{p.disCount} ₺</span>
                        ) : (
                          <span className="text-red-500 text-xs">
                            İndirim Uygulanmamış
                          </span>
                        )}
                      </td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => handleProductDetail(p._id)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          Ürüne Git
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {modal && (
            <ProductModal
              modal={modal}
              setModal={setModal}
              products={products}
              setProducts={setProducts}
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
              onProductUpdate={fetchProducts}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProductsContent;
