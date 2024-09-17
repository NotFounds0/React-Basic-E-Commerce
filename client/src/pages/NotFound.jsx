import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-2xl text-center">
        <img src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif" alt="404 Not Found" className="w-64 h-64 mx-auto mb-8 rounded-full border-4 border-blue-500" />
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Sayfa Bulunamadı</h2>
        <p className="mt-4 text-lg text-gray-600">Üzgünüz, aradığınız sayfa mevcut değil. Lütfen ana sayfaya dönün veya arama yapın.</p>
        <a href="/" className="mt-8 inline-block px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  )
}

export default NotFound