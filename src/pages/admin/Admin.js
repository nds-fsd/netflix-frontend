import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import DoorFrontTwoToneIcon from '@mui/icons-material/DoorFrontTwoTone';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { List, ListItem, ListItemText, MenuItem, ListItemAvatar, Avatar, Stack, Paper } from '@mui/material';
import MuiTextFieldController from '../../components/muiTextFieldController/MuiTextFieldController';
import styles from './Admin.module.css';
import MuiSelectController from '../../components/muiSelectController/MuiSelectController';
import { categories, language, otherLanguage, rating } from '../../utils/formMenuItems';
import { appendMovieToBBDD, deleteMovieFormBBDD, getMovieById, patchMovieById } from '../../utils/movies';
import api from '../../utils/api';

const Admin = ({ name, label, rules, helperText, multilinie }) => {
  const [listMovies, setListMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { control, handleSubmit, reset, register, watch } = useForm({ defaultValues: {} });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const onSubmit = (data) => {
    if (isEditing === true) {
      patchMovieById(editMovie._id, data);
      setRefresh(!refresh);
    } else {
      appendMovieToBBDD(data);
    }
    reset();
    setRefresh(!refresh);
  };

  const deleteMovie = (id) => {
    deleteMovieFormBBDD(id);
    setRefresh(!refresh);
  };
  useEffect(() => {
    api('GET', 'movies').then((movies) => {
      setListMovies(movies);
    });
  }, [refresh]);

  const openForm = () => {
    reset({ defaultValues: {} });
    setIsFormVisible(true);
  };

  const movieToEdit = (id) => {
    getMovieById(id)
      .then((movie) => setEditMovie(movie))
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
      reset(editMovie);
      setRefresh(!refresh);
    }
  }, [editMovie]);
  return (
    <div className={styles.pageContainer}>
      {isFormVisible && (
        <div className={styles.createMovies}>
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
                />
              </div>
              <div className={styles.center}>
                <span className={styles.titles}>Release date on Streaming</span>
                <input
                  className={styles.datePicker}
                  {...register('releaseDateStreaming', { required: true })}
                  type="date"
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
              {/* <MuiSelectController control={control} name="categories" id="categories" label="Categories">
              {categories.map((res) => (
                <MenuItem key={res.value} value={res.value}>
                  {res.text}
                </MenuItem>
              ))}
            </MuiSelectController> */}
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
        </div>
      )}
      <div className={styles.movieContainer}>
        {isFormVisible === true ? null : (
          <div className={styles.openForm}>
            <Button onClick={() => openForm()} variant="contained" size="large">
              Open Form To Create Movie
            </Button>
          </div>
        )}
        <Paper style={{ maxHeight: 740, overflow: 'auto' }}>
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
      </div>
    </div>
  );
};

export default Admin;
