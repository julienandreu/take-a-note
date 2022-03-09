import React, { FC, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuWrapper from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../hooks/use-app-context.hook';
import { state } from '../store';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import FolderOpen from '@mui/icons-material/FolderOpen';
import SaveAs from '@mui/icons-material/SaveAs';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import { useTranslation } from 'react-i18next';

export const Menu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const { t } = useTranslation();

  const {
    platform,
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
    onShortcutTriggerred,
  } = useAppContext();

  const commandOrControl = useMemo(() => (platform === 'darwin' ? '⌘' : 'CTRL'), [platform]);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNew = useCallback(() => {
    state.file.name = `${t('editor:new-file')} ${++state.file.count}`;
    state.file.path = '';
    state.file.content = '';
    setAnchorEl(null);
  }, []);

  const handleOpen = useCallback(() => {
    fileOpen(state.file.path);
  }, []);

  const handleSave = useCallback(() => {
    if (!state.file.path) {
      alert('You could not save an empty file');
      setAnchorEl(null);
      return;
    }

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
    onShortcutTriggerred('CommandOrControl+N', handleNew);
    onShortcutTriggerred('CommandOrControl+O', handleOpen);
    onShortcutTriggerred('CommandOrControl+S', handleSave);
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
        <MenuList
          sx={{
            width: '240px',
            maxWidth: '100%',
          }}
        >
          <MenuItem onClick={handleNew}>
            <ListItemIcon>
              <InsertDriveFile fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('menu:new-file')}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              {commandOrControl}N
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <FolderOpen fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('menu:open')}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              {commandOrControl}O
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleSave}>
            <ListItemIcon>
              <SaveAs fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('menu:save-as')}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              {commandOrControl}S
            </Typography>
          </MenuItem>
        </MenuList>
      </MenuWrapper>
    </>
  );
};
