import React from 'react';
import { FaShoppingCart, FaUsers, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const DashboardContent = () => {
  const stats = [
    { title: 'Toplam Satış', value: '₺124,563', icon: FaShoppingCart, color: 'bg-blue-500' },
    { title: 'Yeni Kullanıcılar', value: '1,234', icon: FaUsers, color: 'bg-green-500' },
    { title: 'Gelir', value: '₺56,789', icon: FaMoneyBillWave, color: 'bg-yellow-500' },
    { title: 'Büyüme', value: '%23', icon: FaChartLine, color: 'bg-red-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className={`inline-block p-3 rounded-full ${stat.color} text-white mb-4`}>
              <stat.icon className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      {/* Buraya grafik veya tablo eklenebilir */}
    </div>
  );
};

export default DashboardContent;