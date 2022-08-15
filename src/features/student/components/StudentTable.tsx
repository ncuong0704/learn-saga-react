import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from 'app/hooks';
import { selectCityMap } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { capitalizeText, getMarkColor } from 'utils';

export interface StudentTableProps {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
  const cityMap = useAppSelector(selectCityMap)
  const [open, setOpen] = useState(false);
  const [selectStudent, setSelectStudent] = useState<Student>()

  const handleClose = ()=>{
    setOpen(false)
  }
  const handleClickDeleteStudent = (student: Student)=>{
    setOpen(true)
    setSelectStudent(student)
  }
  const handleConfirmDeleteStudent = (student: Student)=>{
    setOpen(false)
    onRemove?.(student)
  }

  return (
    <>
     <TableContainer>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, inx) => (
            <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {student.id}
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{capitalizeText(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)}>
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{cityMap[student.city]}</TableCell>
              <TableCell>
                <Button variant='contained' color='primary' onClick={()=> onEdit?.(student)}>
                  Edit
                </Button>
                <Button variant='outlined' color='error' onClick={()=>handleClickDeleteStudent(student)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove the student "{selectStudent?.name}"? <br/> Click Remove to confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleConfirmDeleteStudent(selectStudent as Student)} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
