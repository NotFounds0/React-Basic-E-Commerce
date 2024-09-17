import { useState } from "react";
import { FaBox, FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import DashboardContent from "../../components/adminComponents/DashboardContent";
import ProductsContent from "../../components/adminComponents/ProductsContent";
import UsersContent from "../../components/adminComponents/UsersContent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdminPage = () => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "products":
        return <ProductsContent />;
      case "users":
        return <UsersContent />;
      default:
        return <DashboardContent />;
    }
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Admin Çıkış",
      text: "Çıkış Yapmak İstediğine Emin misin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminToken");
        nav("/adminLogin");
        toast.success("Başarıyla Çıkış Yaptınız.");
      }
    });
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <NavItem
            icon={<FaChartBar />}
            title="Dashboard"
            id="dashboard"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem
            icon={<FaBox />}
            title="Ürünler"
            id="products"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem
            icon={<FaUsers />}
            title="Kullanıcılar"
            id="users"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaSignOutAlt className="mr-2" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">{renderContent()}</div>
    </div>
  );
};

const NavItem = ({ icon, title, id, activeTab, setActiveTab }) => (
  <button
    className={`flex items-center w-full p-4 text-left ${
      activeTab === id
        ? "bg-blue-500 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={() => setActiveTab(id)}
  >
    {icon}
    <span className="ml-2">{title}</span>
  </button>
);

export default AdminPage;
