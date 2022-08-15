import { FormControl, FormHelperText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Student } from 'models';
import { Control, useController } from 'react-hook-form';

export interface Option {
  label?: string;
  value: number | string;
}

export interface SelectFeildProps {
  name: 'name' | 'id' | 'age' | 'mark' | 'gender' | 'city' | 'createdAt' | 'updatedAt';
  control: Control<Student, object>;
  label?: string;
  disabled?: boolean;
  options: Option[];
}

export function SelectFeild({ name, control, label, disabled, options }: SelectFeildProps) {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl fullWidth disabled={disabled} error={Boolean(errors[name]?.message)}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        id='demo-simple-select'
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}
