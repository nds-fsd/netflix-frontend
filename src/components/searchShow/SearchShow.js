import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getMovieByParams } from '../../utils/movies';
import Modal from '../modal/Modal';

/*
      <input type="text" placeholder="search" onChange={(e) => debounced(e.target.value)} />
      <ul>{search === '' ? <li>Search a Movie</li> : movies.map((movie) => <li key={movie.id}>{movie.title}</li>)}</ul>
  */

const SearchShow = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const debounced = useDebouncedCallback((value) => setSearch(value), 1500);
  console.log(search);

  useEffect(() => {
    getMovieByParams(search).then((data) => setMovies(data));
  }, [search]);

  console.log(movies);
  return (
    <Autocomplete
      disablePortal
      freeSolo={false}
      id="combo-box-demo"
      options={movies.map((movie) => movie.title)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search" onClick={(e) => console.log(e)} />}
    />
  );
};

export default SearchShow;
