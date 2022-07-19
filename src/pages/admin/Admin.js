import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import MuiTextFieldController from '../../components/muiTextFieldController/MuiTextFieldController';

const Admin = ({ name, label, rules }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Admin</h1>
        <Controller
          name="Input1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Input1" size="small" />}
        />
        <MuiTextFieldController control={control} name="Input2" label="Input2" rules={{ required: true }} />
        <input type="submit" />
      </div>
    </form>
  );
};

export default Admin;
