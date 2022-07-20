import api from './api'

const getFavFromBackend = (user) => {
    return api('GET', `user/${user.user.id}/favs`);
}

export { getFavFromBackend }