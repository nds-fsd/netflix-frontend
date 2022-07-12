import API_URL from  './api';
import api from './api';

let dataFetched;
const getMovies = async () => {
  const getTokenFromLocalStorage = JSON.parse(window.localStorage.getItem("userLogin"))
  const { token } = getTokenFromLocalStorage;
  const options = {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + token
    }
  }
  const urlTofetch = API_URL + '/movies'

  
  await fetch(urlTofetch, options)
    .then((res) => res.json())
    .then((data) => {
      dataFetched = data
      return dataFetched;
      
    })
    .catch((err) => console.log(err))
    return dataFetched
}



const movieToFav = async (userSession, body) => {
  api("POST", `user/${userSession.user.id}/favs`, { body }).then(res => {
    console.log(res.favs)
  }).catch(e => {
    console.error(e)
  })
}

const removeMovieFromFav = async (userSession, movie) => {
  api("DELETE", `user/${userSession.user.id}/favs/${movie}`).then(res => {
    console.log(res.favs)
}).catch(e => {
    console.error(e)
})
}



export { getMovies, movieToFav, removeMovieFromFav}

