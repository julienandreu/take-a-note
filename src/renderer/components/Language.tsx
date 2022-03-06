import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import MenuWrapper from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import { availableLanguages } from '../../configs/i18n';
import { useTranslation } from 'react-i18next';
import { state } from '../store';

export const Language: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = useCallback((language: typeof availableLanguages[number]) => {
    const shouldChangeFilename = new RegExp(t('editor:new-file')).test(state.file.name);
    i18n.changeLanguage(language);

    if (shouldChangeFilename) {
      state.file.name = `${t('editor:new-file')} ${state.file.count}`;
    }

    setAnchorEl(null);
  }, []);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  if (!availableLanguages) {
    return <></>;
  }

  return (
    <>
      <Button
        id="toggle-languages"
        onClick={handleClick}
        size="large"
        color="inherit"
        aria-label="languages"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {t(`languages:${i18n.language}` as 'languages:any')}
      </Button>
      <MenuWrapper
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList>
          {availableLanguages.map((language: typeof availableLanguages[number]) => (
            <MenuItem key={`availableLanguage_${language}`} onClick={() => handleChangeLanguage(language)}>
              {t(`languages:${language}` as 'languages:any')}
            </MenuItem>
          ))}
        </MenuList>
      </MenuWrapper>
    </>
  );
};
