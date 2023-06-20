import "./App.css";
import { Carousel } from "./layouts/Homepage/Carousel";
import { ExploreTopBooks } from "./layouts/Homepage/ExploreTopBooks";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
    </div>
  );
}

export default App;
