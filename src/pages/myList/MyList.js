import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { getFavFromBackend } from '../../utils/getFavs';
import { getUserSession } from '../../utils/sesion';
import styles from './myList.module.css';

const MyList = () => {
  const [favList, setFavlist] = useState([]);
  // const { urlImgMovieCard, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;

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
            urlImgMovieCard={movie.prj_urlImgMovie}
            tittle={movie.prj_title}
            urlImgModal={movie.prj_urlImgModal}
            movieDescription={movie.prj_description}
            movieRating={movie.prj_rating}
            movieRuntime={movie.prj_runtime}
          />
        ))}
      </div>
    </div>
  );
};
export default MyList;
