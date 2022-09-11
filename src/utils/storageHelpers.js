export const setStorageItem = (name, data) => {
  const stringData = JSON.stringify(data);

  console.trace();
  localStorage.setItem(name, stringData);
};

export const getStorageItem = (key) => {
  const stringData = localStorage.getItem(key);
  return JSON.parse(stringData);
};

export const hasStorageItem = (key) => {
  const item = getStorageItem(key);
  return item !== null;
};
