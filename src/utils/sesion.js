import { getStorageItem, hasStorageItem, setStorageItem } from './storageHelpers';

export const getUserSession = () => getStorageItem('userSession');
export const getFavsMovies = () => getStorageItem('favs');

export const setUserSession = (sessionData) => setStorageItem('userSession', sessionData);

export const hasUserSession = () => hasStorageItem('userSession');

export const getToken = () => {
  if (hasUserSession()) {
    return getUserSession().token;
  }
  return undefined;
};

export const getUser = () => {
  if (hasUserSession()) {
    return getUserSession().user;
  }
  return undefined;
};

export const getFavMoviesFromLocalStorage = () => {
  if (hasUserSession()) {
    return getFavsMovies();
  }
  return undefined;
};

export const removeUserSession = () => {
  localStorage.removeItem('userSession');
};
