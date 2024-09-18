import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { RiVisaLine, RiMastercardLine, RiPaypalLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Hakkımızda</h3>
            <p className="text-sm leading-relaxed">
              Müşteri memnuniyetini ön planda tutan e-ticaret mağazamız, en
              kaliteli ürünleri uygun fiyatlarla sunmayı hedefler.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Hızlı Linkler
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="/urunler"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Ürünler
                </a>
              </li>
              <li>
                <a
                  href="/kampanyalar"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Kampanyalar
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/sss"
                  className="hover:text-blue-600 transition duration-300"
                >
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a
                  href="/iletisim"
                  className="hover:text-blue-600 transition duration-300"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">İletişim</h3>
            <p className="text-sm leading-relaxed">
              Adres: Örnek Mahallesi, E-Ticaret Caddesi No:123
              <br />
              Tel: +90 123 456 7890
              <br />
              E-posta: info@eticaret.com
            </p>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Çalışma Saatleri
              </h4>
              <p className="text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
              <p className="text-sm">Cumartesi: 10:00 - 15:00</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Bültenimize Katılın
            </h3>
            <p className="text-sm mb-4">
              En yeni ürünler ve kampanyalardan haberdar olun!
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition duration-300"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="#"
              className="text-2xl text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-2xl text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FaYoutube />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <RiVisaLine className="text-3xl text-gray-600" />
            <RiMastercardLine className="text-3xl text-gray-600" />
            <RiPaypalLine className="text-3xl text-gray-600" />
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            &copy; 2023 E-Ticaret Mağazası. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
