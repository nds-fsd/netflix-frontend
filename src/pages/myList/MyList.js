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
        {favList.map(({ _id, title, urlImgMovie, urlImgModal, description, rating, runtime }) => (
          <Card
            id={_id}
            urlImgMovie={urlImgMovie}
            tittle={title}
            urlImgModal={urlImgModal}
            movieDescription={description}
            movieRating={rating}
            movieRuntime={runtime}
          />
        ))}
      </div>
    </div>
  );
};
export default MyList;
