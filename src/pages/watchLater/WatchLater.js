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
      setWatchLater(response.map(item => item.movie));
    });
  }, []);

  return (
    <div>
      <div>
        {watchLater.map((movie) => (
          <Card
           movie={movie}
          />
        ))}
      </div>
    </div>
  );
};
export default WatchLaterList;
