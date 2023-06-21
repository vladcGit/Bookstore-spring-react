import React from "react";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Carousel } from "./components/Carousel";
import { Hero } from "./components/Heros";
import LibraryServices from "./components/LibraryServices";

export default function HomePage() {
  return (
    <>
      <ExploreTopBooks />
      <Carousel />
      <Hero />
      <LibraryServices />
    </>
  );
}
