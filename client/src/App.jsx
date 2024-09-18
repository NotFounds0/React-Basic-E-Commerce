import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import AdminPage from "./pages/admin/AdminPage";
import AdminLogin from "./pages/admin/AdminLogin";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import ProductsPages from "./pages/productsPages";
import ProductsDetails from "./pages/productsDetails";
import ProfilePage from "./pages/profile/profilePage";
import Sepet from "./pages/Sepet";
import Notfound from "./pages/NotFound";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedAdminPage = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    toast.error("Bu sayfaya erişim yetkiniz yok!");
    return <Navigate to="/adminLogin" />;
  }

  return children;
};

const ProtectedAdminLogin = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    toast.error("Zaten Giriş Yapmışsınız!");
    return <Navigate to="/admin" />;
  }

  return children;
};

const ProtectedProfile = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    toast.error("Lütfen giriş yapınız!");
    return <Navigate to="/login" />;
  }

  return children;
};

const ProtectedLogReg = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userID");

  if (token && userId) {
    toast.error("Zaten giriş yapmışsınız!");
    return <Navigate to={`/profile/${userId}`} />;
  }

  return children;
};

function App() {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminPage>
              <AdminPage />
            </ProtectedAdminPage>
          }
        />
        <Route
          path="/adminLogin"
          element={
            <ProtectedAdminLogin>
              <AdminLogin />
            </ProtectedAdminLogin>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedLogReg>
              <Register />
            </ProtectedLogReg>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedLogReg>
              <Login />
            </ProtectedLogReg>
          }
        />
        <Route path="/products" element={<ProductsPages />} />
        <Route path="/ProductsDetails/:id" element={<ProductsDetails />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedProfile>
              <ProfilePage />
            </ProtectedProfile>
          }
        />
        <Route path="/sepet" element={<Sepet />} />
      </Routes>
    </Router>
  );
}

export default App;
