import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu } from './Menu';
import { useSnapshot } from 'valtio';
import { state } from '../store';

interface HeaderProps {
  title?: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const {
    file: { name = '', path = '' },
  } = useSnapshot(state);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Menu />
          <Typography variant="h6" component="div" sx={{ flexGrow: Number(!path) }}>
            {name}
          </Typography>
          {path && (
            <Typography
              variant="caption"
              component="div"
              sx={{ ml: 2, mt: 1, flexGrow: 1, flexShrink: 0, fontStyle: 'italic' }}
            >
              {path}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
