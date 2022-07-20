import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

import styles from './MuiTextFieldController.module.css';

const MuiTextFieldController = (props) => {
  const { name, label, value, control, helperText, fullWidth, multiline, variant } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      label={label}
      value={value}
      fullWidth={fullWidth}
      helperText={helperText}
      defaultValue=""
      multiline={multiline}
      variant={variant}
      render={({ field }) => (
        <TextField
          className={styles.input}
          {...field}
          size="small"
          margin="dense"
          label={label}
          variant={variant}
          helperText={helperText}
          fullWidth
          required
          color="warning"
          multiline
        />
      )}
    />
  );
};

export default MuiTextFieldController;
