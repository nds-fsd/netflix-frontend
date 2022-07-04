
//  caution Bearer needs a blankspace after last r to be functional.

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
  const urlTofetch = 'http://localhost:3001/movies'
  await fetch(urlTofetch, options)
    .then((res) => res.json())
    .then((data) => {
      dataFetched = data
      return dataFetched;
      
    })
    .catch((err) => console.log(err))
    return dataFetched
}

export { getMovies }

