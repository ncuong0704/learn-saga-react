import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <Paper>
      <Typography sx={{padding: "12px"}}>{title}</Typography>
      <Box >{children}</Box>
    </Paper>
  );
}
