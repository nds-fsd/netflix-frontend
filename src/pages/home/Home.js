import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import '../../components/card/Card.css';
import Category from '../../components/category/category';
import api from '../../utils/api';
import CarouselShow from '../../components/carousel/CarouselShow';

function Home() {
  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshListMovies = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    api('GET', 'movies').then((moviesData) => setMovies(moviesData));
  }, [refresh]);

  const categoriesPlus = [
    { categoryName: 'Action', movies },
    { categoryName: 'Horror', movies },
    { categoryName: 'Comedy', movies },
    { categoryName: 'Drama', movies },
  ];

  return (
    <div className="homeFakeflix">
      <div className="allMovies">ALL MOVIES</div>
      <CarouselShow movies={movies} />
      {categoriesPlus.map((category) => (
        <Category category={category} />
      ))}
    </div>
  );
}
export default Home;
