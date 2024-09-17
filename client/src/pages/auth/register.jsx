import React, { useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOnPassword, setIsOnPassword] = useState(false);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:5000/api/users/create", {
        email,
        password,
        fullName,
      });
  
      if (res.status === 201) {
        toast.success("Kayıt Başarılı. Yönlendiriliyorsunuz...");
        resetForm();
        setTimeout(() => {
          nav("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Eğer e-posta zaten kayıtlıysa bu mesaj gösterilecek
        toast.error("Bu e-posta zaten kayıtlı.");
      } else {
        // Diğer hatalar için genel hata mesajı
        toast.error("Kayıt işlemi sırasında bir hata oluştu.");
      }
      console.log(error);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Hesap Oluştur
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Hemen üye olun ve alışverişin keyfini çıkarın
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            method="POST"
          >
            <div className="rounded-md shadow-sm ">
              <div className="mb-4">
                <label htmlFor="name" className="sr-only">
                  Ad Soyad
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="Ad Soyad"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  E-posta adresi
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="E-posta adresi"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Şifre
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isOnPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="Şifre"
                />
                <button
                  type="button"
                  onClick={() => setIsOnPassword(!isOnPassword)}
                >
                  göster
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Kayıt Ol
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Zaten hesabınız var mı?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Giriş yapın
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
