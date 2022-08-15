import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import StudentTable from '../components/StudentTable';
import Pagination from '@mui/material/Pagination';
import StudentFilters from '../components/StudentFilters';
import { selectCityList } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  headContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
  },
  filter: {
    marginBottom: '20px',
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityList = useAppSelector(selectCityList);
  const match = useRouteMatch();
  const history = useHistory()


  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: value,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleDeleteStudent = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || '');

      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditStudent = (student: Student)=>{
    history.push(`${match.path}/${student.id}`)
  }
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.headContainer}>
        <Typography variant='h4'>Student Management</Typography>
        <Link to={`${match.path}/add`} style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Add New</Button>
        </Link>
      </Box>
      <Box className={classes.filter}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      <StudentTable studentList={studentList} onRemove={handleDeleteStudent} onEdit={handleEditStudent} />
      <Pagination
        className={classes.pagination}
        color='primary'
        count={Math.ceil(pagination._totalRows / pagination._limit)}
        page={pagination._page}
        onChange={handleChange}
      />
    </Box>
  );
}
