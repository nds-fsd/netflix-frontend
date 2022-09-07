import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { getWatchfromBack } from '../../utils/getWatchLater';
import { getUserSession } from '../../utils/sesion';
import './WatchLater.css';

const WatchLaterList = () => {
  const [watchLaterShow, setWatchLaterShow] = useState([]);

  useEffect(() => {
    const user = getUserSession();
    getWatchfromBack(user).then((response) => {
      setWatchLaterShow(response);
    });
  }, []);

  console.log('1 watchLaterShow:', watchLaterShow);

  return (
    <div>
      <div>
        <h1>hi alejandra</h1>
        {watchLaterShow.map(({ _id, title, urlImgMovie, urlImgModal, description, rating, runtime }) => (
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
