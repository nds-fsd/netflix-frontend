import api from './api';

const getFavFromBackend = (user) => api('GET', `user/${user.user.id}/favs`);

export { getFavFromBackend };
