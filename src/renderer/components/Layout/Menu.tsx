import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuWrapper from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '../../hooks/use-app-context.hook';
import { useSnapshot } from 'valtio';
import { state } from '../../store';

export const Menu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const { sendPing, onPingReceive } = useAppContext();
  const {
    ping: { count = 0 },
  } = useSnapshot(state);

  const pingCalls = useMemo(() => count + 1, [count]);

  const getOrdinalSuffix = useCallback((number: number) => {
    switch (number.toString().substring(-1, 1)) {
      case '1':
        return number === 11 ? 'th' : 'st';
      case '2':
        return number === 12 ? 'th' : 'nd';
      case '3':
        return number === 13 ? 'th' : 'rd';
      default:
        return 'th';
    }
  }, []);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleNew = useCallback(() => {
    state.file.content = '';
    setAnchorEl(null);
  }, []);

  const handleOpenFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const filelist = event?.target?.files;
    if (!filelist) {
      setAnchorEl(null);
      return;
    }

    const file = filelist[0];
    if (!file) {
      setAnchorEl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      state.file.name = file.name;
      state.file.path = file.path;
      state.file.content = reader?.result?.toString() ?? '';
      setAnchorEl(null);
    };
    reader.readAsText(file);
  }, []);

  const handlePing = useCallback(() => {
    sendPing();
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    onPingReceive((data) => {
      alert(data);
      ++state.ping.count;
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
        <input
          accept="text/*"
          onChange={handleOpenFile}
          style={{ display: 'none' }}
          id="open-file"
          type="file"
          value={''}
        />
        <MenuItem component="label" htmlFor="open-file">
          Open
        </MenuItem>
        <MenuItem onClick={handleClose}>Save as...</MenuItem>
        <MenuItem onClick={handlePing}>
          Ping for the {pingCalls}
          {getOrdinalSuffix(pingCalls)} time
        </MenuItem>
      </MenuWrapper>
    </>
  );
};
