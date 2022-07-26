import React from 'react';
import styles from './category.module.css';
import Card from '../card/Card';

const Category = ({ category }) => {
  console.log(category);
  return (
    <>
      <div className={styles.Categorias}>{category.categoryName}</div>
      <div className={styles.CategoryMovie}> {category.movies.map(({movie, _id, title, urlImageMovie, urlImageModal, description, rating, runtime}) => (
        <Card
         refreshListMovies={() => refreshListMovies()}
         id={_id}
         urlImageMovie={urlImageMovie}
         title={title}
         urlImgModal={urlImageModal}
         movieDescription={description}
         movieRating={rating}
         movieRuntime={runtime}
       />
      // <div>{movie?.movie}</div>
      ))}
     </div>
    </>
  );
};

export default Category;
