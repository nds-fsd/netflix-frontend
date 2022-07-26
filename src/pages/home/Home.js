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

  console.log(movies);
  const categoriesPlus = [
    { categoryName: 'ACTION', movies },
    { categoryName: 'HORROR', movies },
    { categoryName: 'COMEDY', movies },
    { categoryName: 'DRAMA', movies },
  ];

  return (
    <div className="category">
      {categoriesPlus.map((category) => (
        <Category category={category} />
      ))}
      {/* <div className="filmContainer">
        {movies &&
          movies.map(({ _id, title, urlImageMovie, urlImageModal, description, rating, runtime }) => (
            <Card
              refreshListMovies={() => refreshListMovies()}
              id={_id}
              urlImageMovie={urlImageMovie}
              title={title}
              urlImgModal={urlImageModal}
              movieDescription={description}
              movieRating={rating}
              movieRuntime={runtime}
            />
          ))}
      </div> */}
    </div>
  );
}
export default Home;
