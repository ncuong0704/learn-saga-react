import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { StudentForm } from '../components/StudentForm';

export default function AddEditPage() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.get(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    city: '',
    gender: 'male',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);

    toast.success("Success Update Student!");

    } else {
      await studentApi.add(formValues);

    toast.success("Success Add New Student!");
    }

    history.push('/admin/students');
  };

  return (
    <Box>
      <Button
        onClick={() => {
          history.push('/admin/students');
        }}
      >
        <ArrowBackIosNewIcon /> Back to student list
      </Button>
      <Typography variant='h4' mt={2}>
        {isEdit ? 'Update student' : 'Add new student'}
      </Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
        <ToastContainer />
    </Box>
  );
}
