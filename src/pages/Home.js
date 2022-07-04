import React from 'react'
import Card from '../components/card/Card'
import '../components/card/Card.css'
import { getMovies } from '../utils/movies'
import { useState, useEffect } from 'react'

function Home() {
  const [movies, setMovies] = useState([])
  const [refresh, setRefresh] = useState(false)

  const refreshListMovies = () => {
    setRefresh(!refresh)
  }

  const getMoviesFromApi = async () => {
    const moviesFetched = await getMovies()
    setMovies(moviesFetched)
  }
  
  useEffect(() => {
    getMoviesFromApi()
  }, [refresh])
  return (
    <div>
      HOME
      <div className='filmContainer'>
        {movies && movies.map(
          ({
            prj_title,
            prj_urlImgMovie,
            prj_urlImgModal,
            prj_description,
            prj_rating,
            prj_runtime,
          }) => (
            <Card
              refreshListMovies={() => refreshListMovies()}
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
