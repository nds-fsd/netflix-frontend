import { React, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './carouselShow.css';
import Modal from '../modal/Modal';
import { getFavMoviesFromLocalStorage, getUserSession } from '../../utils/sesion';
import { getFavMovies, movieToFav, removeMovieFromFav } from '../../utils/movies';

const CarouselShow = ({ movies }) => {
  const [width, setWidth] = useState(0);
  //! This is for check!
  const [modalOpen, setModalOpen] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [fav, setFav] = useState(false);

  // useRef is kinda document.queryselector in JS
  const carousel = useRef();
  useEffect(() => {
    if (carousel.current) {
      setWidth(Number(carousel.current?.scrollWidth) - Number(carousel.current?.offsetWidth));
      console.log(carousel);
    }
    // carousel -d is added to recalculate after every resize
  }, [carousel]);

  //! This is for check!
  const handleModal = async (movie) => {
    setModalOpen(!modalOpen);
    setMovieInfo(movie);
    getFavMovies(getUserSession());
    const favs = getFavMoviesFromLocalStorage();
    if (favs.includes(movieInfo.id)) {
      setFav(true);
    }
  };
  const handleFavButton = () => {
    const userSession = getUserSession();
    const body = { id: movieInfo.id };
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

  return movies?.length ? (
    <div>
      {modalOpen && <Modal movieInfo={movieInfo} closeModal={handleModal} setMylist={handleFavButton} />}
      <motion.div ref={carousel} className="carousel" whileTap={{ cursor: 'grabbing' }}>
        <motion.div
          // drag makes the motion of sliding, x means horizontal
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="innerCarousel">
          {movies.map((movie) => (
            <motion.div className="item" key={movie._id} onClick={(value) => handleModal(movie)}>
              <img src={movie.urlImgMovie} alt={movie.title} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  ) : (
    'No data assigned'
  );
};

export default CarouselShow;
