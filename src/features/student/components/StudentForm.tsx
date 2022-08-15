import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputFeild, RadioGroupFeild } from 'components/FormFeilds';
import { SelectFeild } from 'components/FormFeilds/SelectFeild';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const schema = yup
    .object({
        name: yup
        .string()
        .required('Please enter name.')
        .test('two-words', 'Please enter at least two words', (value) => {
          if (!value) return true;
    
          const parts = value?.split(' ') || [];
          return parts.filter((x) => Boolean(x)).length >= 2;
        }),
      age: yup
        .number()
        .positive('Please enter a positive number.')
        .min(18, 'Min is 18')
        .max(60, 'Max is 60')
        .integer('Please enter an integer.')
        .required('Please enter age.')
        .typeError('Please enter a valid number.'),
      mark: yup
        .number()
        .min(0, 'Min is 0')
        .max(10, 'Max is 10')
        .required('Please enter mark.')
        .typeError('Please enter a valid number.'),
      gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please select either male or female.')
        .required('Please select gender.'),
      city: yup.string().required('Please select city.'),
    }).required();
  const { control, handleSubmit, formState: {isSubmitting} } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>("")

  const handleFormSubmit = async (formValues: Student) => {
    try {
        await onSubmit?.(formValues)
    } catch (error) {
        setError((error as Error).message)
    }
  };

  const cityOptions = useAppSelector(selectCityOptions);

  return (
    <Box>
      <form style={{ maxWidth: '400px' }} onSubmit={handleSubmit(handleFormSubmit)}>
        <InputFeild name='name' label='Fullname' control={control} />
        <RadioGroupFeild
          name='gender'
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputFeild name='age' label='Age' control={control} />
        <InputFeild name='mark' label='Mark' control={control} />
        <SelectFeild name='city' control={control} label="City" options={cityOptions} />
        {Boolean(error) &&  <Alert severity="error">{error}</Alert>}
        <Box mt={2}>
          <Button type='submit' fullWidth variant='contained' color='primary'>
            {isSubmitting && <CircularProgress size={16} color="secondary" style={{marginRight: "12px"}} />}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
