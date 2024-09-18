import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addProducts } from "../../redux/reducer/cartSlice";

const ProductCard = ({ product, pDetailClick }) => {
  const dispatch = useDispatch();

  if (!product) {
    return toast.error("Ürün Çekilirken Hata Oluştur.");
  }

  const cartAddProduct = () => {
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

      toast.error("Ürünü Satın Almak İçin Giriş Yapınız.");
      return;
    } else {
      dispatch(addProducts({ ...product, quantity: 1 }));
      toast.success("Ürün sepete eklendi");
    }
  };
  return (
    <div className="bg-white h-full rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between py-2 px-2">
      <div className="">
        <img
          onClick={() => pDetailClick(product._id)}
          src={
            product.img || "https://via.placeholder.com/300x300?text=No+Image"
          }
          alt={product.name || "Ürün"}
          className="w-full h-64 object-cover cursor-pointer"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1">
            {product.name}
          </h3>

          {product.disCount ? (
            <div className="flex gap-2 items-center">
              <p className="text-xl font-bold text-green-500">
                {product.disCount}₺
              </p>
              <span className="line-through font-bold text-indigo-600 text-end">
                {product.price}₺
              </span>
            </div>
          ) : (
            <p className="font-bold text-indigo-600 text-xl">
              {product.price}₺
            </p>
          )}
        </div>
      </div>

      <button
        onClick={cartAddProduct}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
      >
        <FaShoppingCart className="mr-2" /> Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;
