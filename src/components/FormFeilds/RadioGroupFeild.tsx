import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Student } from 'models';
import { Control, useController } from 'react-hook-form';

export interface RadioOption{
  label?: string;
  value: number | string;
}


export interface RadioGroupFeildProps {
  name: 'name' | 'id' | 'age' | 'mark' | 'gender' | 'city' | 'createdAt' | 'updatedAt';
  control: Control<Student, object>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupFeild({ name, control, label, disabled, options }: RadioGroupFeildProps) {
  const {
    field: { value, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl disabled={disabled} error={Boolean(errors[name]?.message)}>
    <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      value={value}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    >
      {options.map(option => (
      <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option?.label} />
      ))}
    </RadioGroup>
    <FormHelperText>{errors[name]?.message}</FormHelperText>
  </FormControl>
  );
}
