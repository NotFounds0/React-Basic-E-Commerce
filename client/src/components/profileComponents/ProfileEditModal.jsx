import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loading from "../Loading";

const ProfileEditModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    adress: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const id = localStorage.getItem("userID");
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/get/${id}`
        );
        if (res.status === 200) {
          setProfileData({
            fullName: res.data.fullName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            adress: res.data.adress,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isOpen) {
      getUserData();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("userID");
    const { fullName, email, phoneNumber, adress } = profileData;

    Swal.fire({
      title: "Güncelleme?",
      text: "Hesabınızı Güncellemek İstediğinize Emin misiniz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet Güncelle.",
      cancelButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        onClose();

        try {
          const res = await axios.put(
            `http://localhost:5000/api/users/update/${id}`,
            { fullName, email, phoneNumber, adress }
          );
          if (res.status === 200) {
            setLoading(false);
            toast.success("Profil Başarıyla Güncellendi");
          }
          window.location.reload();
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    });
  };

  const handleDelProfile = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("userID");

    Swal.fire({
      title: "Profil Silme?",
      text: "Hesabınızı Silmek İstediğinize Emin misiniz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet sil!",
      cancelButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        onClose();

        try {
          const res = await axios.delete(
            `http://localhost:5000/api/users/delete/${id}`
          );
          if (res.status === 200) {
            setTimeout(() => {
              setLoading(false);
              localStorage.removeItem("authToken");
              localStorage.removeItem("userID");
              localStorage.removeItem("userData");
              Swal.fire({
                title: "Silindi!",
                text: "Hesabınız Başarıyla Silindi",
                icon: "success",
              });
              toast.success("Hesabınız Başarıyla Silindi");
              nav("/login");
            }, 2000);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Profili Düzenle</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Ad Soyad
                </label>
                <input
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  E-posta
                </label>
                <input
                  value={profileData.email}
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Telefon
                </label>
                <input
                  maxLength={10}
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adress"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Adres
                </label>
                <textarea
                  value={profileData.adress}
                  onChange={handleInputChange}
                  id="adress"
                  name="adress"
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 w-full bg-gray-900 py-2 text-white rounded-lg"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Kaydet
                </button>
              </div>
            </form>

            <button
              onClick={handleDelProfile}
              type="submit"
              className="w-full py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 mt-2"
            >
              Sil
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ProfileEditModal;
