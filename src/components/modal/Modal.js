import React, { useEffect, useInsertionEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import FavButton from '../favButton/FavButton';
import WatchLaterButton from '../watchLater/WatchLaterButton';
import {
  getFavMovies,
  getWatchLaterMovies,
  movieToFav,
  movieToWatchLater,
  removeMovieFromFav,
  removeMovieFromWatchLater,
} from '../../utils/movies';
import { getUserSession } from '../../utils/sesion';

const Modal = ({ movie, closeModal, updateMovies }) => {
  const [favMovies, setFavMovies] = useState([]);
  const [watchMovies, setWatchMovies] = useState([]);
  const [fav, setFav] = useState(false);
  const [watch, setWatch] = useState(false);
  const userSession = getUserSession();

  React.useEffect(() => {
    getFavMovies(userSession).then((response) => {
      setFavMovies(response.map((responseMovie) => responseMovie._id));
    });
    getWatchLaterMovies(userSession).then((response) => {
      setWatchMovies(
        response.map((responseMovie) => ({
          movie: responseMovie.movie._id,
          _id: responseMovie._id,
        })),
      );
    });
  }, []);

  const { urlImgModal, title, description, movieRuntime, movieRating, id } = movie || {};
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
      movieToFav(userSession, { id: movie._id });
      setFav(true);
    } else {
      removeMovieFromFav(userSession, movie._id);
      setFav(false);
    }
    getWatchLaterMovies(userSession).then((response) => {
      setWatchMovies(response.map((responseMovie) => responseMovie.movie._id));
    });
  };

  const handleWatchLaterButton = () => {
    if (watch === false) {
      movieToWatchLater(userSession, { id: movie._id }).then((data) => {
        setWatch(data);
        updateMovies();
      });
    } else {
      const toDelete = watchMovies.find((item) => item.movie === movie._id)?._id;
      removeMovieFromWatchLater(userSession, toDelete).then((data) => {
        setWatch(!data);
        updateMovies();
      });
    }
  };

  const handleClick = () => {
    navigate('/player', { state: { movie } });
  };
  useEffect(() => {
    if (favMovies) setFav(favMovies.includes(movie?._id));
  }, [favMovies]);

  useEffect(() => {
    console.log(watchMovies);
    console.log(movie);
    if (watchMovies.find((item) => item.movie === movie?._id)) setWatch(true);
  }, [watchMovies]);

  console.log(watch);

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
            <WatchLaterButton id={id} className="eyeButton" setWatch={handleWatchLaterButton} watchState={watch} />
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
