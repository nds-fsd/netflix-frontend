
function getMovies(){
    return fetch('http://localhost:8000/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    })
    .catch(error => console.log(error))
}

export {
    getMovies
}