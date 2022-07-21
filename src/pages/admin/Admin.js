import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import MuiTextFieldController from '../../components/muiTextFieldController/MuiTextFieldController';
import styles from './Admin.module.css';
import MuiSelectController from '../../components/muiSelectController/MuiSelectController';
import { language, otherLanguage, rating } from '../../utils/formMenuItems';
import { appendMovieToBBDD } from '../../utils/movies';

const Admin = ({ name, label, rules, helperText, multilinie }) => {
  const { control, handleSubmit, reset, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    appendMovieToBBDD(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  return (
    <div className={styles.createMovies}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.center}>
          <span className={styles.titleDashboard}>Create Movie Dashboard</span>
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
          <MuiSelectController control={control} name="otherLanguagues" id="otherLanguageSelect" label="Other Language">
            {otherLanguage.map((res) => (
              <MenuItem key={res.value} value={res.value}>
                {res.text}
              </MenuItem>
            ))}
          </MuiSelectController>
        </div>

        <MuiTextFieldController control={control} name="description" label="Description" multilinie variant="filled" />
        <div className={styles.buttonCreate}>
          <Button type="submit" variant="contained" color="warning" size="large">
            Create Movie
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
