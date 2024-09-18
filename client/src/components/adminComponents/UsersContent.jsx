import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UsersModal from "./adminModal/UsersModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loading from "../Loading";

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/get");
        if (res.status === 200) {
          setTimeout(() => {
            setUsers(res.data);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentProduct(user);
    setModal(true);
  };

  const handleSave = async (updatedUser) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${updatedUser._id}`,
        updatedUser
      );

      if (res.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? { ...user, ...updatedUser } : user
          )
        );
        setModal(false);
        Swal.fire("Başarılı!", "Kullanıcı başarıyla güncellendi.", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Hata!", "Kullanıcı güncellenirken bir hata oluştu.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Silme İşlemi?",
        text: "Kullanıcıyı silmek istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Evet, sil",
        cancelButtonText: "Hayır",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
          setUsers(users.filter((user) => user._id !== id));
          Swal.fire("Silindi!", "Kullanıcı başarıyla silindi.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Kullanıcılar</h2>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Ad Soyad</th>
                <th className="p-3 text-left">E-Posta</th>
                <th className="p-3 text-left">Telefon Numarası</th>
                <th className="p-3 text-left">Rol</th>
                <th className="p-3 text-left">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phoneNumber}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <UsersModal
          onClose={() => setModal(false)}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default UsersContent;
