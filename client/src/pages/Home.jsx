import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import HeroSection from "../components/HomeComponents/HeroSection";
// import FeaturedProducts from "../components/HomeComponents/FeaturedProducts";
import Newsletter from "../components/HomeComponents/Newsletter";
import Products from "../components/HomeComponents/Products";
import CustomerReviews from "../components/HomeComponents/CustomerReviews";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* <FeaturedProducts /> */}
        <Products />
        <CustomerReviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Home;
