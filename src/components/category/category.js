import styles from './category.module.css';
import Card from '../card/Card';

const Category = ({ category }) => {
  console.log(category.categoryName);

  return (
    <>
      <div className={styles.Categorias}>{category.categoryName}</div>
      <div className={styles.CategoryMovie}>
        {category.movies.map((movies) => {
          if (category.categoryName === movies.categories[0]) {
            return (
              <Card
                key={movies._id}
                id={movies._id}
                urlImgMovie={movies.urlImgMovie}
                title={movies.title}
                urlImgModal={movies.urlImgModal}
                movieDescription={movies.description}
                movieRating={movies.rating}
                movieRuntime={movies.runtime}
              />
            );
          }
          return undefined;
        })}
      </div>
    </>
  );
};

export default Category;
