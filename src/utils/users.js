import api from './api';

const appendUserToBBDD = async (body) => api('POST', 'user', { body });
const deleteUserFromBBDD = async (id) => api('DELETE', `user/${id}`);
const getUserById = async (id) => api('GET', `user/${id}`);
const patchUserById = async (id, body) => api('PATCH', `user/${id}`, { body });

export { deleteUserFromBBDD, getUserById, patchUserById, appendUserToBBDD };
