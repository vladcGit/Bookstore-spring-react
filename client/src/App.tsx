import "./App.css";
import { Carousel } from "./layouts/Homepage/Carousel";
import { ExploreTopBooks } from "./layouts/Homepage/ExploreTopBooks";
import { Hero } from "./layouts/Homepage/Heros";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Hero />
    </div>
  );
}

export default App;
