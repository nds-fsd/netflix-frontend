import { React, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './carouselShow.css';
import Card from '../card/Card';
import '../card/Card.css';

const CarouselShow = (props) => {
  const { movies } = props;
  const [width, setWidth] = useState(0);
  const [refresh, setRefresh] = useState(false);
  // useRef is kinda document.queryselector in JS
  const carousel = useRef();
  useEffect(() => {
    if (carousel.current) {
      setWidth(Number(carousel.current?.scrollWidth) - Number(carousel.current?.offsetWidth));
      console.log(carousel);
    }
    // carousel -d is added to recalculate after every resize
  }, [carousel]);

  // useEffect(() => {
  //   api('GET', 'movies').then((moviesData) => setMovies(moviesData));
  // }, [refresh]);

  return movies?.length ? (
    <div>
      <motion.div ref={carousel} className="carousel" whileTap={{ cursor: 'grabbing' }}>
        <motion.div
          // drag makes the motion of sliding, x means horizontal
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="innerCarousel">
          {movies.map(({ _id, urlImgMovie, title, urlImgModal, description, rating, runtime }) => (
            <motion.div className="item" key={_id}>
              {/* <img src={movie.urlImgMovie} alt="" /> */}
              <Card
                id={_id}
                urlImgMovie={urlImgMovie}
                title={title}
                urlImgModal={urlImgModal}
                movieDescription={description}
                movieRating={rating}
                movieRuntime={runtime}
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
