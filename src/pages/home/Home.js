import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import '../../components/card/Card.css';
import Category from '../../components/category/category';
import api from '../../utils/api';

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
    <div className="category">
      {categoriesPlus.map((category) => (
        <Category category={category} />
      ))}
      <div className="filmContainer">
        {movies &&
          movies.map(({ _id, title, urlImgMovie, urlImgModal, description, rating, runtime }) => (
            <Card
              key={_id}
              refreshListMovies={() => refreshListMovies()}
              id={_id}
              urlImgMovie={urlImgMovie}
              title={title}
              urlImgModal={urlImgModal}
              movieDescription={description}
              movieRating={rating}
              movieRuntime={runtime}
            />
          ))}
      </div>
    </div>
  );
}
export default Home;
