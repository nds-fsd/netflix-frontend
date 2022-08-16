import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';
import FavButton from '../favButton/FavButton';

// import Player from '../player/Player';

const Modal = ({ urlImgModal, title, closeModal, description, movieRuntime, movieRating, setMylist, stateFav, id }) => {
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
  const handleClick = () => {
    navigate('/player');
  };

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
            <FavButton id={id} className="favStar" setFav={setMylist} favState={stateFav} />
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
