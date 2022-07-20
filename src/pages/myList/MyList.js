import React, { useEffect, useState } from 'react'
import Card from '../../components/card/Card';
import api from '../../utils/api';
import styles from  "./myList.module.css";

const MyList = () => {

    const [favList, setFavlist] = useState([]);
    // const { urlImgMovieCard, title, urlImgModal, movieDescription, movieRating, movieRuntime, id } = props;

    useEffect(() => {
        api('GET', 'movies').then((movies) => {
            console.log(movies) 
            setFavlist(movies)})
        
    }, []);

    // const isNotFav = () => {
    //     if (!favList)
    // }
        
  return (
  <div className={styles.FavList}>
  <h2 className={styles.Title}>My favourite movies </h2>
    <div className={styles.ListContainer}>
       {favList.map((movie) => (
        <Card
        id = {movie._id}
        urlImgMovieCard = {movie.prj_urlImgMovie}
        tittle = {movie.prj_title}
        urlImgModal = {movie.prj_urlImgModal}
        movieDescription = {movie.prj_description}
        movieRating = {movie.prj_rating}
        movieRuntime = {movie.prj_runtime}
        />
    ))} 
    </div>
    
 </div>
)
}
export default MyList
