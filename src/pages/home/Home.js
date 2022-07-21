import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import '../../components/card/Card.css';
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

  return (
    <div>
      HOME
      <div className="filmContainer">
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
      </div>
    </div>
  );
}
export default Home;
