import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu } from './Menu';

interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title = 'New file 1' }) => (
  <AppBar position="relative">
    <Toolbar>
      <Menu />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);
