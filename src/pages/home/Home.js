import React, { useState, useEffect } from 'react';
import '../../components/card/Card.css';
import Category from '../../components/category/category';
import api from '../../utils/api';
import CarouselShow from '../../components/carousel/CarouselShow';

function Home() {
  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] = useState([]);

  const refreshListMovies = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    api('GET', 'movies').then((moviesData) => setMovies(moviesData));
    api('GET', 'category').then((dataCategory) => setCategories(dataCategory));
  }, [refresh]);

  // const categoriesPlus = [
  //   { categoryName: 'Action', movies },
  //   { categoryName: 'Horror', movies },
  //   { categoryName: 'Comedy', movies },
  //   { categoryName: 'Drama', movies },
  // ];
  return (
    <div className="homeFakeflix">
      <div className="allMovies">ALL MOVIES</div>
      <CarouselShow movies={movies} />
      {categories.map(({ _id, title, description }) => (
        <Category id={_id} titleCategory={title} descriptionCategory={description} />
      ))}
    </div>
  );
}
export default Home;
