import styles from './category.module.css';
import Card from '../card/Card';

const Category = ({ category }) => {
  console.log(category);

  return (
    <>
      <div className={styles.Categorias}>{category.categoryName}</div>
      <div className={styles.CategoryMovie}>
        {' '}
        {category.movies.map(({ movie, _id, title, urlImgMovie, urlImgModal, description, rating, runtime }) => (
          <Card
            key={_id}
            refreshListMovies={() => {}}
            id={_id}
            urlImgMovie={urlImgMovie}
            title={title}
            urlImgModal={urlImgModal}
            movieDescription={description}
            movieRating={rating}
            movieRuntime={runtime}
          />
          //  <div>{movie?.movie}</div>
        ))}
      </div>
    </>
  );
};

export default Category;
