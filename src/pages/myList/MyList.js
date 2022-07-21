import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { getFavFromBackend } from '../../utils/getFavs';
import { getUserSession } from '../../utils/sesion';
import styles from './myList.module.css';

const MyList = () => {
  const [favList, setFavlist] = useState([]);

  useEffect(() => {
    const user = getUserSession();
    getFavFromBackend(user).then((response) => {
      setFavlist(response);
    });
  }, []);

  return (
    <div className={styles.FavList}>
      <h2 className={styles.Title}>My favourite movies </h2>
      <div className={styles.ListContainer}>
        {favList.map((movie) => (
          <Card
            id={movie.id}
            urlImgMovieCard={movie.urlImgMovie}
            tittle={movie.title}
            urlImgModal={movie.urlImgModal}
            movieDescription={movie.description}
            movieRating={movie.rating}
            movieRuntime={movie.runtime}
          />
        ))}
      </div>
    </div>
  );
};
export default MyList;
