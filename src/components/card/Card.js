import React, { useState } from 'react';
import './Card.css';
import Modal from '../modal/Modal';
import { getFavMoviesFromLocalStorage, getUserSession } from '../../utils/sesion';
import { getFavMovies, movieToFav, removeMovieFromFav } from '../../utils/movies';

const Card = (props) => {
  const { urlImgMovieCard, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [fav, setFav] = useState(false);

  const handleModal = async () => {
    setModalOpen(!modalOpen);
    getFavMovies(getUserSession());
    const favs = getFavMoviesFromLocalStorage();
    if (favs.includes(id)) {
      setFav(true);
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

  return (
    <>
      {modalOpen && (
        <Modal
          id={id}
          urlImg={urlImgMovieCard}
          title={title}
          imgModal={urlImgModal}
          description={movieDescription}
          closeModal={handleModal}
          movieRuntime={movieRuntime}
          movieRating={movieRating}
          setMylist={handleFavButton}
          stateFav={fav}
        />
      )}
      <div className="wrapperCard" onClick={handleModal}>
        <div className="wrapperImg">
          <img src={urlImgMovieCard} alt={title} />
        </div>
      </div>
    </>
  );
};

export default Card;
