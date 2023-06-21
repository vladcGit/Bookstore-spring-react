import "./App.css";
import HomePage from "./layouts/Homepage/HomePage";
import Footer from "./layouts/NavbarAndFooter/Footer";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";

function App() {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooksPage />
      <Footer />
    </div>
  );
}

export default App;
