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
  const [modalShow, setModalShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(undefined);

  const debounced = useDebouncedCallback((value) => setSearch(value), 1500);
  console.log(search);

  useEffect(() => {
    getMovieByParams(search).then((data) => setMovies(data));
  }, [search]);

  const handleOnChange = (value) => {
    setSelectedMovie(movies.find((movie) => movie.title === value));
    setModalShow(true);
  };

  console.log('selectedMovies', selectedMovie);
  console.log(modalShow);
  console.log(movies);
  return (
    <>
      {modalShow && (
        <Modal
          closeModal={() => {
            setModalShow(false);
          }}
          movie={selectedMovie}
        />
      )}
      <Autocomplete
        disablePortal
        freeSolo={false}
        id="combo-box-demo"
        options={movies.map((movie) => movie.title)}
        onChange={(v) => {
          handleOnChange(v.target.outerText);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" onChange={() => console.log('holi')} />}
      />
    </>
  );
};

export default SearchShow;