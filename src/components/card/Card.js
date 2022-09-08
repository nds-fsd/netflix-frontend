import React, { useState } from 'react';
import './Card.css';
import Modal from '../modal/Modal';
import { getUserSession } from '../../utils/sesion';
import { getFavMovies, movieToFav, removeMovieFromFav } from '../../utils/movies';

const Card = (props) => {
  const { urlImgMovie, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [fav, setFav] = useState(false);

  const handleModal = async () => {
    setModalOpen(!modalOpen);
    getFavMovies(getUserSession()).then((response) => {
      response.forEach((element) => {
        if (element._id === id) {
          setFav(true);
        }
      });
    });
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
          urlImgMovie={urlImgMovie}
          title={title}
          urlImgModal={urlImgModal}
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
          <img src={urlImgMovie} alt={title} />
        </div>
      </div>
    </>
  );
};

export default Card;
