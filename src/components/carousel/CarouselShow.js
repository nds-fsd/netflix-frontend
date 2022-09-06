import { React, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './carouselShow.css';
import Modal from '../modal/Modal';
import { getFavMoviesFromLocalStorage, getUserSession } from '../../utils/sesion';
import { getFavMovies, movieToFav, removeMovieFromFav } from '../../utils/movies';
import Card from '../card/Card';

const CarouselShow = (props) => {
  const { movies, urlImgMovie, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;
  const [width, setWidth] = useState(0);
  //! This is for check!
  const [modalOpen, setModalOpen] = useState(false);
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

  return movies?.length ? (
    <div>
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
      <motion.div ref={carousel} className="carousel" whileTap={{ cursor: 'grabbing' }}>
        <motion.div
          // drag makes the motion of sliding, x means horizontal
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="innerCarousel">
          {movies.map((movie) => (
            <motion.div className="item" key={movie._id} onClick={handleModal}>
              <Card
                key={movie._id}
                id={movie._id}
                urlImgMovie={movie.urlImgMovie}
                title={movie.title}
                urlImgModal={movie.urlImgModal}
                movieDescription={movie.description}
                movieRating={movie.rating}
                movieRuntime={movie.runtime}
              />
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
