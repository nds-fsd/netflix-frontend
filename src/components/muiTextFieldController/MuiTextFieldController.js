import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const MuiTextFieldController = (props) => {
  const { control } = useForm();
  const { name, label, rules, value } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      label={label}
      value={value}
      defaultValue=""
      render={({ field }) => <TextField {...field} size="small" margin="normal" label={label} />}
    />
  );
};

export default MuiTextFieldController;
