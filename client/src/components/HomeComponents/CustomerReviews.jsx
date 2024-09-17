import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const CustomerReviews = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const reviews = [
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      rating: 5,
      comment: 'Harika ürünler! Kalite ve fiyat dengesi mükemmel.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      rating: 4,
      comment: 'Çok memnun kaldım, kesinlikle tavsiye ederim.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 3,
      name: 'Zeynep Demir',
      rating: 5,
      comment: 'Müşteri hizmetleri çok ilgili, sorunumu hemen çözdüler.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-down">
          Müşteri Yorumları
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <FaQuoteLeft className="text-4xl text-blue-500 opacity-20 absolute top-4 left-4" />
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">{review.comment}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12" data-aos="fade-up">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            Tüm Yorumları Gör
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;