export const SortArrayUsers = (x, y) => {
  if (x.name.toLowerCase() < y.name.toLowerCase()) return -1;
  if (x.name.toLowerCase() > y.name.toLowerCase()) return 1;
  return 0;
};

export const SortArrayMovies = (x, y) => {
  if (x.title.toLowerCase() < y.title.toLowerCase()) return -1;
  if (x.title.toLowerCase() > y.title.toLowerCase()) return 1;
  return 0;
};
