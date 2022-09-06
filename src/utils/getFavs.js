import api from './api';

const getFavFromBackend = async (user) => api('GET', `user/${user.user.id}/favs`);

export { getFavFromBackend };
