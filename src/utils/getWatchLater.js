import api from './api';

const getWatchfromBack = (user) => api('GET', `user/${user.user.id}/watchlater`);

export { getWatchfromBack };
