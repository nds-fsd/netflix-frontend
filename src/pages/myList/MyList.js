import React, {useState} from 'react';
import Card from '../../components/card/Card';
import styles from './myList.module.css';
import {getFavMovies} from "../../utils/movies";
import {getUserSession} from "../../utils/sesion";

const MyList = () => {
    const userSession = getUserSession();
    const [favMovies, setFavMovies] = useState()

    React.useEffect(() => {
        getFavMovies(userSession).then((response) => {
            setFavMovies(response)
        });
    }, []);

  return (
    <div className={styles.FavList}>
      <h2 className={styles.Title}>My favourite movies </h2>
      <div className={styles.ListContainer}>
        {favMovies?.map((movie) => (
          <Card
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};
export default MyList;
