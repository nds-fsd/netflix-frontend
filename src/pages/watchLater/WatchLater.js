import { WatchLater } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { getWatchfromBack } from '../../utils/getWatchLater';
import { getUserSession } from '../../utils/sesion';
import './WatchLater.css';

const WatchLaterList = () => {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const user = getUserSession();
    getWatchfromBack(user).then((response) => {
      setWatchLater(response);
    });
  }, []);

  return (
    <div>
      <div>
        {watchLater.map(({ _id, title, urlImgMovie, urlImgModal, description, rating, runtime }) => (
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
export default WatchLaterList;
