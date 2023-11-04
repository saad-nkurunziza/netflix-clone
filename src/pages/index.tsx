import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import { Favorites, Movies } from "@/constants";

const Home = () => {
  const movies = Movies;
  const favorites = Favorites;
  const [open, setOpen] = useState(false);
  const toggleShow = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <InfoModal visible={open} onClose={toggleShow} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default Home;
