import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { decrease, deleteProducts, increase } from "../redux/reducer/cartSlice";
import Swal from "sweetalert2";

const Sepet = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = Number(cart.total) || 0;
  const kdv = Number(cart.kdv) || 0;

  const kdvAmount = ((total * kdv) / 100).toFixed(2);
  const totalWithKdv = (total + Number(kdvAmount)).toFixed(2);

  const handleDecrease = (urun) => {
    if (urun.quantity === 1) {
      Swal.fire({
        title: "Silmek istediğinizden emin misiniz?",
        text: "ürünü sepetten sileceksiniz.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, sil!",
        cancelButtonText: "Hayır",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteProducts(urun));
        }
      });
    } else {
      dispatch(decrease(urun));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto p-6 max-w-5xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Alışveriş Sepetiniz
        </h1>

        <div className="mb-8 text-lg text-gray-700">
          Toplam ürün sayısı:{" "}
          <span className="font-bold text-green-600">{cart.items.length}</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="text-xl text-gray-600">
                Sepetinizde ürün bulunmuyor.
              </span>
              <a
                href="/products"
                className="bg-indigo-500 px-8 py-2 rounded-lg text-white mt-2 hover:bg-indigo-600"
              >
                Alışverişe Başla
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.items.map((urun) => (
                <div
                  key={urun._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <img
                    src={urun.img}
                    alt={urun.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {urun.name}
                  </h2>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      {urun.disCount ? (
                        <p className="text-lg font-bold text-green-500">
                          {urun.disCount}₺ -{" "}
                          <span className="line-through text-xs text-indigo-600">
                            {urun.price}₺
                          </span>
                        </p>
                      ) : (
                        <p className="text-lg font-bold text-indigo-600">
                          {urun.price}₺
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrease(urun)}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        -
                      </button>

                      <span className="font-semibold">{urun.quantity}</span>
                      <button
                        onClick={() => dispatch(increase(urun))}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Silmek?",
                        text: "Ürünü Sepetten Silmek istediğine Emin misin!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Evet Sil!",
                        cancelButtonText: "Hayır",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(deleteProducts(urun));
                        }
                      });
                    }}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="bg-gray-50 p-6 mt-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold text-gray-800">
                Ürün Toplamı
              </p>
              <p className="text-xl font-bold text-indigo-600">{total}₺</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold text-gray-800">KDV(%{kdv})</p>
              <p className="text-xl font-bold text-green-600">+{kdvAmount}₺</p>
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-xl font-semibold text-gray-800">Toplam</p>
              <p className="text-3xl font-bold text-indigo-600">
                {totalWithKdv}₺
              </p>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold text-lg shadow-md">
                Satın Al
              </button>
              <button className="w-full bg-white text-indigo-600 py-3 px-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition duration-300 font-semibold text-lg">
                Alışverişe Devam Et
              </button>
              <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300 font-semibold text-lg shadow-md">
                Sepeti Temizle
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Sepet;
