import FemaleRoundedIcon from '@mui/icons-material/FemaleRounded';
import FmdBadRoundedIcon from '@mui/icons-material/FmdBadRounded';
import MaleIcon from '@mui/icons-material/Male';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { StatisticItem } from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import { Widget } from './components/Widget';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

const useStyles = () => ({
  root: {
    position: 'relative',
    paddingTop: '8px',
  },
  progress: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
  },
});

export default function Dashboard() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistic = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box sx={classes.root}>
      {loading && <LinearProgress sx={classes.progress} />}
      {/* section statistics -- start */}
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={3}>
          <StatisticItem
            icon={<MaleIcon color='primary' fontSize='large' />}
            label='Male'
            value={statistic.maleCount}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatisticItem
            icon={<FemaleRoundedIcon color='secondary' fontSize='large' />}
            label='Female'
            value={statistic.femaleCount}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatisticItem
            icon={<ThumbUpAltRoundedIcon color='success' fontSize='large' />}
            label='High Mark'
            value={statistic.highMarkCount}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatisticItem
            icon={<FmdBadRoundedIcon color='error' fontSize='large' />}
            label='Low Mark'
            value={statistic.maleCount}
          />
        </Grid>
      </Grid>
      {/* section statistics -- end */}
      {/* section all students ranking -- start */}
      <Box mt={4}>
        <Typography variant='h5' sx={{ margin: '12px 0' }}>
          All Student
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={3}>
            <Widget title='STUDENT WITH HIGHEST MARK'>
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <Widget title='STUDENT WITH LOWEST MARK'>
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>
      {/* section all students ranking -- end */}

      {/* section ranking by city -- start */}
      <Box mt={4}>
        <Typography variant='h5' sx={{ margin: '12px 0' }}>
          All Student
        </Typography>
        <Grid container spacing={2}>
          {rankingByCityList.map((ranking) => (
            <Grid item key={ranking.cityId} xs={6} md={4} lg={3}>
              <Widget title={ranking.cityName}>
                <StudentRankingList studentList={ranking.rankingList} />
              </Widget>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* section ranking by city -- end */}
    </Box>
  );
}
