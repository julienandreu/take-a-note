import React, { FC, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuWrapper from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../hooks/use-app-context.hook';
import { state } from '../store';

export const Menu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const {
    fileOpen,
    onFileOpenSucess,
    onFileOpenError,
    fileRead,
    onFileReadSucess,
    onFileReadError,
    fileSave,
    onFileSaveSucess,
    onFileSaveError,
    fileWrite,
    onFileWriteSucess,
    onFileWriteError,
  } = useAppContext();

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNew = useCallback(() => {
    state.file.name = `New file ${++state.file.count}`;
    state.file.path = '';
    state.file.content = '';
    setAnchorEl(null);
  }, []);

  const handleOpen = useCallback(() => {
    fileOpen(state.file.path);
  }, []);

  const handlePing = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSave = useCallback(() => {
    fileSave(state.file.path);
  }, []);

  useEffect(() => {
    onFileOpenSucess((filePaths) => {
      const filePath = filePaths.find(Boolean);
      if (!filePath) {
        setAnchorEl(null);
        return;
      }

      state.file.name = filePath.replace(/^.*[\\\/]/, '');
      state.file.path = filePath;
      fileRead(filePath);
    });
    onFileOpenError((error) => {
      console.error(error);
      setAnchorEl(null);
    });
    onFileReadSucess((content) => {
      state.file.content = content ?? '';
      setAnchorEl(null);
    });
    onFileReadError((error) => {
      console.error(error);
      setAnchorEl(null);
    });
    onFileSaveSucess((filePath) => {
      if (!filePath) {
        setAnchorEl(null);
        return;
      }

      fileWrite(filePath, state.file.content);
    });
    onFileSaveError((error) => {
      console.error(error);
      setAnchorEl(null);
    });
    onFileWriteSucess((filePath) => {
      state.file.name = filePath.replace(/^.*[\\\/]/, '') ?? '';
      state.file.path = filePath ?? '';
      setAnchorEl(null);
    });
    onFileWriteError((error) => {
      console.error(error);
      setAnchorEl(null);
    });
  }, []);

  return (
    <>
      <IconButton
        id="toggle-menu"
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <MenuWrapper
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleNew}>New file</MenuItem>
        <MenuItem onClick={handleOpen}>Open</MenuItem>
        <MenuItem onClick={handleSave}>Save as...</MenuItem>
      </MenuWrapper>
    </>
  );
};
