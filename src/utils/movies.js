import api from './api';

// const getFavMovies = async (userSession) => {
//   api('get', `user/${userSession.user.id}/favs `)
//     // .then((res) => {
//     //   const favs = res;
//     //   window.localStorage.setItem('favs', JSON.stringify(favs));
//     //   return favs;
//     // })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };

const getFavMovies = async (userSession) => {
  const response = await api('get', `user/${userSession.user.id}/favs `);
  return response;
};

const getWatchLaterMovies = async (userSession) => {
  const response = await api('get', `user/${userSession.user.id}/watchlater`);
  return response;
};

const movieToFav = async (userSession, body) => {
  api('POST', `user/${userSession.user.id}/favs`, { body })
    .then((res) => {
      console.log(res.favs);
    })
    .catch((e) => {
      console.error(e);
    });
};

const movieToWatchLater = async (userSession, body) => {
  api('POST', `user/${userSession.user.id}/watchlater`, { body })
    .then((res) => {
      console.log(res.favs);
    })
    .catch((e) => {
      console.error(e);
    });
};

const removeMovieFromFav = async (userSession, movie) => {
  api('DELETE', `user/${userSession.user.id}/favs/${movie}`)
    .then((res) => {
      console.log(res.favs);
    })
    .catch((e) => {
      console.error(e);
    });
};

const removeMovieFromWatchLater = async (userSession, movie) => {
  api('DELETE', `user/${userSession.user.id}/watchlater/${movie}`)
    .then((res) => {
      console.log(res.favs);
    })
    .catch((e) => {
      console.error(e);
    });
};

const appendMovieToBBDD = async (body) => api('POST', 'movies', { body });

const deleteMovieFormBBDD = async (id) => api('DELETE', `movies/${id}`);

const getMovieById = async (id) => api('GET', `movies/${id}`);

const patchMovieById = async (id, body) => api('PATCH', `movies/${id}`, { body });

const getMovieByParams = async (string) => api('GET', `movies?name=${string}`);

export {
  movieToFav,
  movieToWatchLater,
  removeMovieFromFav,
  removeMovieFromWatchLater,
  getFavMovies,
  getWatchLaterMovies,
  appendMovieToBBDD,
  deleteMovieFormBBDD,
  getMovieById,
  patchMovieById,
  getMovieByParams,
};
