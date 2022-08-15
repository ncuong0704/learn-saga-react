import { TextField } from '@mui/material';
import { Student } from 'models';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFeildProps extends InputHTMLAttributes<HTMLInputElement> {
  name: 'name' | 'id' | 'age' | 'mark' | 'gender' | 'city' | 'createdAt' | 'updatedAt';
  control: Control<Student, object>;
  label?: string;
}

export function InputFeild({ name, control, label, ...inputProps }: InputFeildProps) {
  const {
    field: { value, onChange, onBlur, ref },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size='small'
      margin='normal'
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      variant='outlined'
      inputRef={ref}
      error={Boolean(errors[name]?.message)}
      inputProps={inputProps}
      helperText={errors[name]?.message}
    />
  );
}
