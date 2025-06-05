import Filter from "../components/Filter";
import Footer from "../components/Footer";
import MenuHome from "../components/MenuHome";
import Products from "../components/Products";
import Slider from "../components/Slider";

export default function HomePage() {
  return (
    <>
      <MenuHome />
      <Slider />

      <Filter />
      <main>
        <Products />
      </main>
      <Footer />
    </>
  );
}
