import React from 'react'
import Card from '../../components/card/Card'
import '../../components/card/Card.css'
import { useState, useEffect } from 'react'
import api from '../../utils/api'

function Home() {
  const [movies, setMovies] = useState([])
  const [refresh, setRefresh] = useState(false)

  const refreshListMovies = () => {
    setRefresh(!refresh)
  }
  
  useEffect(() => {
    api("GET", 'movies').then((movies) => setMovies(movies));
  }, [refresh])
  
  return (
    <div>
      HOME
      <div className='filmContainer'>
        {movies && movies.map(
          ({
            _id,
            prj_title,
            prj_urlImgMovie,
            prj_urlImgModal,
            prj_description,
            prj_rating,
            prj_runtime,
          }) => (
            <Card
              refreshListMovies={() => refreshListMovies()}
              id={_id}
              urlImgMovieCard={prj_urlImgMovie}
              title={prj_title}
              urlImgModal={prj_urlImgModal}
              movieDescription={prj_description}
              movieRating={prj_rating}
              movieRuntime={prj_runtime}
            />
          )
        )}
      </div>
    </div>
  )
}
export default Home;
