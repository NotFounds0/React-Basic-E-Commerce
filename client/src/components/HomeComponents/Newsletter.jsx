const Newsletter = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Bültenimize Abone Olun</h2>
          <p className="text-gray-600 mb-6">
            En yeni ürünler ve özel teklifler hakkında bilgi alın.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-grow py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Abone Ol
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
