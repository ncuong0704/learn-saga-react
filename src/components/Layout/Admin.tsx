import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header, Sidebar } from 'components/Common';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridAutoColumns: "230px 1fr",
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: "100vh",
        backgroundColor: "#ffffff"
    },
    header: {
        gridArea: "header",
        borderBottom: `1px solid grey`,
    },
    sidebar: {
        gridArea: "sidebar",
        borderRight: `1px solid grey`,
    },
    main: {
        gridArea: "main",
        padding: "24px",
    },
}));

export function AdminLayout() {
    const classes = useStyles()

  return <Box className={classes.root}>
    <Box className={classes.header}>
        <Header />
    </Box>
    <Box className={classes.sidebar}>
        <Sidebar />
    </Box>
    <Box className={classes.main}>
        <Switch>
            <Route path="/admin/dashboard">
                <Dashboard />
            </Route>
            <Route path="/admin/students">
                <StudentFeature />
            </Route>
        </Switch>
    </Box>
  </Box>;
}
