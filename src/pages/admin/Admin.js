import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import DoorFrontTwoToneIcon from '@mui/icons-material/DoorFrontTwoTone';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import { List, ListItem, ListItemText, MenuItem, ListItemAvatar, Avatar, Stack, Paper } from '@mui/material';
import MuiTextFieldController from '../../components/muiTextFieldController/MuiTextFieldController';

import styles from './Admin.module.css';
import MuiSelectController from '../../components/muiSelectController/MuiSelectController';
import { categories, language, otherLanguage, rating, role } from '../../utils/formMenuItems';
import { appendMovieToBBDD, deleteMovieFormBBDD, getMovieById, patchMovieById } from '../../utils/movies';
import { appendUserToBBDD, deleteUserFromBBDD, getUserById, patchUserById } from '../../utils/users';
import api from '../../utils/api';
import { dateFormater } from '../../utils/dateFormater';
import { SortArrayMovies, SortArrayUsers } from '../../utils/sortArray';

const Admin = ({ name, label, rules, helperText, multilinie }) => {
  const [listMovies, setListMovies] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [sorted, setSorted] = useState(false);
  const { control, handleSubmit, reset, register } = useForm({ defaultValues: {} });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onSubmit = (data) => {
    if (isEditing === true && editMovie !== null) {
      patchMovieById(editMovie._id, data);
      setRefresh(!refresh);
    } else if (isEditing === true && editUser !== null) {
      patchUserById(editUser._id, data);
      setRefresh(!refresh);
    } else if (showUsers) {
      appendUserToBBDD(data);
    } else {
      appendMovieToBBDD(data);
    }
    reset({ defaultValues: {} });
    setRefresh(!refresh);
  };

  const deleteMovie = (id) => {
    deleteMovieFormBBDD(id);
    setRefresh(!refresh);
  };

  const deleteUser = (id) => {
    deleteUserFromBBDD(id);
    setRefresh(!refresh);
  };

  useEffect(() => {
    api('GET', 'movies').then((movies) => {
      sorted ? setListMovies(movies.sort(SortArrayMovies)) : setListMovies(movies);
    });
    api('GET', 'user').then((users) => {
      sorted ? setListUsers(users.sort(SortArrayUsers)) : setListUsers(users);
    });
  }, [sorted]);

  // useEffect(() => {
  //   api('GET', 'user').then((users) => {
  //     setListUsers(users);
  //   });
  // }, [refresh]);

  const openForm = () => {
    if (showUsers) {
      reset({ defaultValues: {} });
      setIsFormVisible(true);
    } else {
      reset({ defaultValues: {} });
      setIsFormVisible(true);
    }
  };

  const showListUsers = () => {
    setShowUsers(!showUsers);
  };

  const movieToEdit = (id) => {
    getMovieById(id)
      .then((movie) => setEditMovie(movie))
      .catch((err) => err);
    setIsEditing(true);
    setRefresh(!refresh);
  };

  const userToEdit = (id) => {
    getUserById(id)
      .then((user) => setEditUser(user))
      .catch((err) => err);
    setIsEditing(true);
    setRefresh(!refresh);
  };

  const closeEdit = () => {
    setEditMovie({});
    setIsEditing(false);
    setIsFormVisible(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (isEditing === false) {
      reset();
      setRefresh(!refresh);
    } else {
      editMovie.releaseDateStreaming = dateFormater(editMovie.releaseDateStreaming);
      // we obtain YYYY-MM-DD data
      editMovie.releaseDateTheaters = dateFormater(editMovie.releaseDateTheaters); // we obtain YYYY-MM-DD data
      reset(editMovie);
      setRefresh(!refresh);
    }
  }, [editMovie]);

  useEffect(() => {
    if (isEditing === false) {
      reset();
      setRefresh(!refresh);
    } else {
      let { password } = editUser;
      password = null;
      editUser.password = password;
      reset(editUser);
      setRefresh(!refresh);
    }
  }, [editUser]);
  return (
    <div className={styles.pageContainer}>
      {isFormVisible && (
        <div className={showUsers ? styles.createUsers : styles.createMovies}>
          {showUsers ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.center}>
                {!isEditing ? (
                  <span className={styles.titleDashboard}>Create User Dashboard</span>
                ) : (
                  <span className={styles.titleDashboard}>Edit User Dashboard</span>
                )}
              </div>
              <MuiTextFieldController control={control} name="name" label="Name" />
              <MuiTextFieldController control={control} name="email" label="Email" />
              <MuiTextFieldController control={control} name="password" label="Password" />
              <div className={styles.centerRole}>
                <MuiSelectController control={control} name="role" id="role" label="Role">
                  {role.map((res) => (
                    <MenuItem key={res.value} value={res.value}>
                      {res.text}
                    </MenuItem>
                  ))}
                </MuiSelectController>
              </div>
              <div className={styles.buttonCreate}>
                {!isEditing ? (
                  <Stack spacing={3} direction="row">
                    <Button onClick={() => setIsFormVisible(false)} variant="contained" color="secondary" size="large">
                      <DoorFrontTwoToneIcon className={styles.spacing} />
                      Close Form
                    </Button>
                    <Button type="submit" variant="contained" color="warning" size="large">
                      <AutoFixHighIcon className={styles.spacing} />
                      Create User
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={2} direction="row">
                    <Button
                      className={styles.spacing}
                      onClick={() => closeEdit()}
                      variant="contained"
                      color="info"
                      size="large">
                      <DoorFrontTwoToneIcon className={styles.spacing} />
                      Close Edit
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" size="large">
                      Update User
                    </Button>
                  </Stack>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.center}>
                {!isEditing ? (
                  <span className={styles.titleDashboard}>Create Movie Dashboard</span>
                ) : (
                  <span className={styles.titleDashboard}>Edit Movie Dashboard</span>
                )}
              </div>
              <MuiTextFieldController control={control} name="title" label="Title" />
              <MuiTextFieldController control={control} name="producer" label="Producer" />
              <MuiTextFieldController control={control} name="castCrew" label="Cast Crew" />
              <MuiTextFieldController control={control} name="director" label="Director" />
              <MuiTextFieldController control={control} name="urlImgMovie" label="Url Image Movie" />
              <MuiTextFieldController control={control} name="urlImgModal" label="Url Image Modal" />
              <MuiTextFieldController
                control={control}
                name="runtime"
                label="Runtime"
                helperText="Fill runtime in minutes, Ex: 120"
              />
              <div className={styles.centerDatePickers}>
                <div className={styles.center}>
                  <span className={styles.titles}>Release date on Theater</span>
                  <input
                    className={styles.datePicker}
                    {...register('releaseDateTheaters', { required: true })}
                    type="date"
                    placeholder="Date"
                    name="releaseDateTheaters"
                  />
                </div>
                <div className={styles.center}>
                  <span className={styles.titles}>Release date on Streaming</span>
                  <input
                    className={styles.datePicker}
                    {...register('releaseDateStreaming', { required: true })}
                    type="date"
                    name="releaseDateStreaming"
                    placeholder="Date"
                  />
                </div>
              </div>
              <div className={styles.containserSelects}>
                <MuiSelectController control={control} name="rating" id="ratingSelect" label="Rating">
                  {rating.map((res) => (
                    <MenuItem key={res.value} value={res.value}>
                      {res.text}
                    </MenuItem>
                  ))}
                </MuiSelectController>
                <MuiSelectController control={control} name="originalLanguage" id="languageSelect" label="Language">
                  {language.map((res) => (
                    <MenuItem key={res.value} value={res.value}>
                      {res.text}
                    </MenuItem>
                  ))}
                </MuiSelectController>
                <MuiSelectController
                  control={control}
                  name="otherLanguagues"
                  id="otherLanguageSelect"
                  label="Other Language">
                  {otherLanguage.map((res) => (
                    <MenuItem key={res.value} value={res.value}>
                      {res.text}
                    </MenuItem>
                  ))}
                </MuiSelectController>
                <MuiSelectController control={control} name="categories" id="categoriesSelect" label="Categories">
                  {categories.map((res) => (
                    <MenuItem key={res.value} value={res.value}>
                      {res.text}
                    </MenuItem>
                  ))}
                </MuiSelectController>
              </div>
              <MuiTextFieldController
                control={control}
                name="description"
                label="Description"
                multilinie
                variant="filled"
              />
              <div className={styles.buttonCreate}>
                {!isEditing ? (
                  <Stack spacing={3} direction="row">
                    <Button onClick={() => setIsFormVisible(false)} variant="contained" color="secondary" size="large">
                      <DoorFrontTwoToneIcon className={styles.spacing} />
                      Close Form
                    </Button>
                    <Button type="submit" variant="contained" color="warning" size="large">
                      <AutoFixHighIcon className={styles.spacing} />
                      Create Movie
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={2} direction="row">
                    <Button
                      className={styles.spacing}
                      onClick={() => closeEdit()}
                      variant="contained"
                      color="info"
                      size="large">
                      <DoorFrontTwoToneIcon className={styles.spacing} />
                      Close Edit
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" size="large">
                      Update Movie
                    </Button>
                  </Stack>
                )}
              </div>
            </form>
          )}
        </div>
      )}
      <div className={styles.movieContainer}>
        {isFormVisible === true ? null : (
          <div className={styles.optionsAdminPanel}>
            <div className={styles.optionButton}>
              <Button onClick={() => openForm()} variant="contained" size="large">
                {showUsers ? <span>Open Form To Create a User</span> : <span>Open Form To Create Movie</span>}
              </Button>
            </div>
            <div className={styles.optionButton}>
              <Button onClick={() => showListUsers()} variant="contained" size="large">
                {showUsers ? <span>Show Movie List</span> : <span>Show User List</span>}
              </Button>
            </div>
            <div className={styles.optionButton}>
              <Button onClick={() => setSorted(!sorted)} variant="contained" size="large">
                {showUsers ? <span>Sort alphabetically</span> : <span>Show last added</span>}
              </Button>
            </div>
          </div>
        )}

        {showUsers ? (
          <Paper
            elevation={12}
            style={{ maxHeight: 740, overflow: 'auto' }}
            className={isFormVisible === true ? null : styles.centerPaper}>
            <List>
              <ListItem className={styles.centerListItem}>
                <div className={styles.containerNames}>
                  <div className={styles.box}>
                    <ListItemText primary="Name User" />
                  </div>
                  <ListItemText primary="ID" />
                  <ListItemText primary="Email" />
                </div>
              </ListItem>
              <hr />
              {listUsers.map((user) => (
                <ListItem key={user.id} className={styles.centerListItem}>
                  <div className={styles.box}>
                    <ListItemText primary={user.name} />
                  </div>
                  <ListItemText primary={user.role} />
                  <ListItemText primary={user.email} />
                  <Stack spacing={1} direction="row">
                    <Button
                      onClick={() => {
                        userToEdit(user._id);
                        setIsFormVisible(true);
                      }}
                      variant="contained"
                      color="secondary"
                      size="medium"
                      className={styles.spacing}>
                      <PlumbingIcon className={styles.spacing} />
                      Edit User
                    </Button>
                    <Button
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                      variant="contained"
                      color="error"
                      size="medium">
                      <MovieIcon className={styles.spacing} />
                      Delete User
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Paper
            elevation={12}
            style={{ maxHeight: 740, overflow: 'auto' }}
            className={isFormVisible === true ? null : styles.centerPaper}>
            <List>
              {listMovies.map((movie) => (
                <ListItem key={movie.id} className={styles.centerListItem}>
                  <ListItemAvatar>
                    <Avatar src={movie.urlImgMovie} alt={movie.title} />
                  </ListItemAvatar>
                  <div className={styles.box}>
                    <ListItemText primary={movie.title} />
                  </div>
                  <ListItemText primary={movie._id} />
                  <ListItemText primary={movie.categories} />

                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={() => {
                        movieToEdit(movie._id);
                        setIsFormVisible(true);
                      }}
                      variant="contained"
                      color="secondary"
                      size="medium"
                      className={styles.spacing}>
                      <PlumbingIcon className={styles.spacing} />
                      Edit Movie
                    </Button>
                    <Button
                      onClick={() => {
                        deleteMovie(movie._id);
                      }}
                      variant="contained"
                      color="error"
                      size="medium">
                      <MovieIcon className={styles.spacing} />
                      Delete Movie
                    </Button>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Admin;
