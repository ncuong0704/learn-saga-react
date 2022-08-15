import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

export interface StatisticItemProps {
    icon: React.ReactElement;
    label: string;
    value: number | string;
}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px"
    },
    icon: {
    },
    body: {
        textAlign: "right"
    },
    label: {
        fontWeight: "bold !important"
    },
    value: {
    }
}))

export function StatisticItem ({icon, label, value}: StatisticItemProps) {
    const classes = useStyles()

  return (
    <Paper className={classes.root}>
        <Box className={classes.icon}>
            {icon}
        </Box>
        <Box className={classes.body}>
            <Typography className={classes.label}>{label}</Typography>
            <Typography className={classes.value}>{value}</Typography>
        </Box>
    </Paper>
  );
}
