import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import ProfileEditModal from "../../components/profileComponents/ProfileEditModal";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false); // Loading state'i
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const getuser = await axios.get(
          `http://localhost:5000/api/users/get/${id}`
        );
        const data = getuser.data;
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [id]);

  const handleLogout = () => {
    Swal.fire({
      title: "Profile Çıkış",
      text: "Çıkış Yapmak İstediğine Emin misin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); // Loading state'ini başlat
        setTimeout(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userID");
          localStorage.removeItem("userData");
          localStorage.removeItem("cart");
          nav("/");
          toast.success("Başarıyla Çıkış Yaptınız.");
          setLoading(false);
        }, 1000);
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getAvatarUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&rounded=true`;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {loading ? (
            <Loading />
          ) : userInfo ? (
            <div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white relative">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
                >
                  Profili Düzenle
                </button>
                <button
                  onClick={handleLogout}
                  className="absolute top-16 right-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  Çıkış Yap
                </button>
                <div className="flex items-center">
                  <img
                    className="h-24 w-24 rounded-full object-cover border-4 border-white"
                    src={getAvatarUrl(userInfo.fullName)}
                    alt="Profil Fotoğrafı"
                  />
                  <div className="ml-6">
                    <h1 className="text-3xl font-bold">{userInfo.fullName}</h1>
                    <p className="text-lg">{userInfo.email}</p>
                    <div className="mt-2">
                      {userInfo.role === "admin" ? (
                        <b className="">
                          {" "}
                          Rol: <a href="/admin" className="bg-red-500 px-3 py-1 rounded-full hover:underline">{userInfo.role}</a>
                        </b>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Profil Bilgileri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="text-gray-600">Ad Soyad</p>
                    <p className="font-medium text-lg">{userInfo.fullName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="text-gray-600">Telefon</p>
                    <p className="font-medium text-lg">
                      {userInfo.phoneNumber
                        ? userInfo.phoneNumber
                        : "Telefon Numarası Girilmemiş"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="text-gray-600">Adres</p>
                    <p className="font-medium text-lg">
                      {userInfo.adress ? userInfo.adress : "Address Girilmemiş"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="text-gray-600">Üyelik Tarihi</p>
                    <p className="font-medium text-lg">
                      {formatDate(userInfo.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
             
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ProfileEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProfilePage;
