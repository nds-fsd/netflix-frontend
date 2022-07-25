import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

const MuiSelectController = ({ name, label, control, defaultValue, children, sx, ...props }) => {
  const labelId = `${name}-label`;
  return (
    <FormControl sx={{ m: 1, minWidth: 160 }} {...props}>
      <InputLabel color="warning" id={labelId}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} control={control} labelId={labelId} label={label} color="warning">
            {children}
          </Select>
        )}
      />
    </FormControl>
  );
};
export default MuiSelectController;
