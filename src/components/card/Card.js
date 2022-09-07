import React, { useState } from 'react';
import './Card.css';
import Modal from '../modal/Modal';
import { getFavMoviesFromLocalStorage, getWatchLaterMoviesFromLocalStorage, getUserSession } from '../../utils/sesion';
import {
  getFavMovies,
  movieToFav,
  removeMovieFromFav,
  getWatchLaterMovies,
  movieToWatchLater,
  removeMovieFromWatchLater,
} from '../../utils/movies';

const Card = (props) => {
  const { urlImgMovie, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [fav, setFav] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  const handleModal = async () => {
    setModalOpen(!modalOpen);
    getFavMovies(getUserSession());
    const favs = getFavMoviesFromLocalStorage();
    if (favs.includes(id)) {
      setFav(true);
    }
    getWatchLaterMovies(getUserSession());
    const watchLater2 = getWatchLaterMoviesFromLocalStorage();
    if (watchLater2.includes(id)) {
      setWatchLater(true);
    }
  };

  const handleFavButton = () => {
    const userSession = getUserSession();
    const body = { id };
    const movie = body.id;
    if (fav === false) {
      movieToFav(userSession, body);
      window.localStorage.setItem('favs', JSON.stringify(movie));
      setFav(true);
    } else {
      removeMovieFromFav(userSession, movie);
      window.localStorage.removeItem('favs', JSON.stringify(movie));
      setFav(false);
    }
  };

  const handleWatchLaterButton = () => {
    const userSession = getUserSession();
    const body = { id };
    const movie = body.id;
    if (watchLater === false) {
      movieToWatchLater(userSession, body);
      window.localStorage.setItem('watchlater', JSON.stringify(movie));
      setWatchLater(true);
    } else {
      removeMovieFromWatchLater(userSession, movie);
      window.localStorage.removeItem('watchlater', JSON.stringify(movie));
      setWatchLater(false);
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          id={id}
          urlImgMovie={urlImgMovie}
          title={title}
          urlImgModal={urlImgModal}
          description={movieDescription}
          closeModal={handleModal}
          movieRuntime={movieRuntime}
          movieRating={movieRating}
          setMylist={handleFavButton}
          stateFav={fav}
          setWatchLaterPage={handleWatchLaterButton}
          stateWatchLater={watchLater}
        />
      )}
      <div className="wrapperCard" onClick={handleModal}>
        <div className="wrapperImg">
          <img src={urlImgMovie} alt={title} />
        </div>
      </div>
    </>
  );
};

export default Card;
