import "./App.css";
import { Carousel } from "./layouts/Homepage/Carousel";
import { ExploreTopBooks } from "./layouts/Homepage/ExploreTopBooks";
import { Hero } from "./layouts/Homepage/Heros";
import LibraryServices from "./layouts/Homepage/LibraryServices";
import Footer from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Hero />
      <LibraryServices />
      <Footer />
    </div>
  );
}

export default App;
