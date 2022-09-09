import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import FavButton from '../favButton/FavButton';
import WatchLaterButton from '../watchLater/WatchLaterButton';
import {getFavMovies, movieToFav, removeMovieFromFav} from '../../utils/movies';
import { getUserSession } from '../../utils/sesion';

const Modal = ({ movie, closeModal }) => {
  const [favMovies, setFavMovies] = useState([])
  const [fav, setFav] = React.useState(false);
  const userSession = getUserSession();
  React.useEffect(() => {
    getFavMovies(userSession).then((response) => {
      setFavMovies(response.map(responseMovie=>responseMovie._id))
    });
  }, []);

  const {
    urlImgModal,
    title,
    description,
    movieRuntime,
    movieRating,
    addToWatchLater,
    includedInWatchLater,
    id,
  } = movie || {};
  const navigate = useNavigate();
  const colorFilmRating = (rating) => {
    switch (rating) {
      case '12+':
        return <p className="yellowRating bold defaultRating">{rating}</p>;
      case '0+':
        return <p className="greenRating bold defaultRating">{rating}</p>;
      case '7+':
        return <p className="blueRating bold defaultRating">{rating}</p>;
      case '16+':
        return <div className="orangeRating bold defaultRating">{rating}</div>;
      case '18+':
        return <p className="redRating bold defaultRating">{rating}</p>;
      default:
        return <p>{movieRating}</p>;
    }
  };

  const handleFavButton = () => {
    if (fav === false) {
      movieToFav(userSession, {id:movie._id});
      setFav(true);
    } else {
      removeMovieFromFav(userSession, movie._id);
      setFav(false);
    }
  };

  const handleClick = () => {
    navigate('/player');
  };
  useEffect(()=>{
    if(favMovies) setFav(favMovies.includes(movie?._id))
  }, [favMovies])
  return (
    <>
      <div className="wrapperModalOverlay">
        <div className="wrapperModal">
          <img src={urlImgModal} alt={' '} />
          <div className="closeModal" onClick={closeModal}>
            ❌
          </div>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="wrapperRating">
            <p>Runtime</p>
            <p className="runtimeMovie">{movieRuntime}</p>
            <p>min</p>
          </div>

          <div className="wrapperRating">
            <p>Rating: </p>

            <p>{colorFilmRating(movieRating)}</p>
            <FavButton id={id} className="favStar" setFav={handleFavButton} favState={fav} />
            <WatchLaterButton
              id={id}
              className="eyeButton"
              setWatchLater={addToWatchLater}
              watchLaterState={includedInWatchLater}
            />
            <button className="playFilm" type="button" onClick={handleClick}>
              PLAY 🎥
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
