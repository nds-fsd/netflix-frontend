import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import styles from '../myList/myList.module.css';
import { getWatchfromBack } from '../../utils/getWatchLater';
import { getUserSession } from '../../utils/sesion';

const WatchLaterList = () => {
  const user = getUserSession();
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    getWatchfromBack(user).then((response) => {
      setWatchLater(response.map((item) => item.movie));
    });
  };

  return (
    <div className={styles.FavList}>
      <h2 className={styles.Title}>Watch later movies </h2>
      <div className={styles.ListContainer}>
        {watchLater?.map((movie) => (
          <Card movie={movie} updateMovies={getMovies} />
        ))}
      </div>
    </div>
  );
};
export default WatchLaterList;
