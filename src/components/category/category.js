import React, { useState, useEffect } from 'react';
import styles from './category.module.css';
import Card from '../card/Card';
import api from '../../utils/api';

const Category = ({ id, titleCategory }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api('GET', 'movies').then((moviesData) => setMovies(moviesData));
  }, []);

  return (
    <div>
      <div className={styles.Categorias}>{`${titleCategory} 🔻`}</div>
      <div className={styles.CategoryMovie}>
        {movies.map((movie) => {
          if (movie?.category._id === id) {
            return <Card movie={movie} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Category;
