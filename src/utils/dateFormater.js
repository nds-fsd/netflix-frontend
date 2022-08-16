export const dateFormater = (date) => {
  const dateFormated = new Date(date).toISOString().slice(0, 10);
  return dateFormated;
};
