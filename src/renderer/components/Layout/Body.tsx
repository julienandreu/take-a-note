import React, { FC } from 'react';
import Box from '@mui/material/Box';

export const Body: FC = ({ children }) => (
  <Box
    sx={{
      backgroundColor: (theme) => theme.palette.grey[100],
      flexGrow: 1,
      p: 4,
    }}
  >
    {children}
  </Box>
);
