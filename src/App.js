import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card/Card';


function App() {
  // const [movies, setMovies] = useState([]);
  // const [refreshApi, setRefreshApi] = useState(false);

const cards = [
    {
        title: 'Avengers Endgame'
        , img: 'https://static.posters.cz/image/1300/posters/avengers-endgame-journey-s-end-i122136.jpg'
    }
    , {
        title: 'Spider-Man No Way Home'
        , img: 'https://es.web.img3.acsta.net/r_1920_1080/pictures/21/11/15/18/17/0807353.jpg'
    }
    , {
        title: 'Deadpool'
        , img: 'https://www.lavanguardia.com/peliculas-series/images/movie/poster/2016/2/w1280/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg'
    }
    , {
        title: 'Doctor Strange En el Multiverso de la locura'
        , img: 'https://lumiere-a.akamaihd.net/v1/images/image_451523ce.jpeg'
    }
  ]


// const getMoviesFromApi = async () => {
//     const movies = await getMovies();
//     setMovies(movies);
    
// }

// useEffect(() => {
//     getMoviesFromApi();
// }, [refreshApi])




  return (
    <div className='filmContainer'>

      {/* This peace of code gona map the array of movies and then gona render each movie in a card */}
      {/* {movies.map(({_id, title, img}) => <Card refreshApi={() => refreshApi()} title={title} img={img} key={_id}/>)} */}
      <Card 
      title={cards[0].title}
      img={cards[0].img} />
      <Card 
      title={cards[1].title}
      img={cards[1].img} />
      <Card 
      title={cards[2].title}
      img={cards[2].img}/>
      <Card 
      title={cards[3].title}
      img={cards[3].img}/>
    </div>
  );
}

export default App;
