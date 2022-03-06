import React, { useCallback, useEffect } from 'react';
import { state } from '../../renderer/store';
import { subscribe, useSnapshot } from 'valtio';
import { useDebounceCallback } from '@react-hook/debounce';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

export const Editor = () => {
  const {
    file: { content = '' },
  } = useSnapshot(state);
  const [value, setValue] = React.useState<string>(content);
  const { t } = useTranslation();

  const updateState = useDebounceCallback(
    (value: string) => {
      state.file.content = value;
    },
    250,
    true,
  );

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    updateState(value);
  }, [value]);

  useEffect(
    () =>
      subscribe(state.file, () => {
        setValue(state.file.content);
      }),
    [state.file.name],
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        display: 'flex',
      }}
    >
      <TextareaAutosize
        id="file-content"
        placeholder={t('editor:placeholder')}
        onChange={handleChange}
        style={{
          flexGrow: 1,
          padding: '16.5px 14px',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          fontSize: '1rem',
          lineHeight: '1.4375em',
          letterSpacing: '0.00938em',
          color: 'rgba(0, 0, 0, 0.87)',
          borderRadius: '4px',
          width: '100%',
        }}
        value={value}
      />
    </Box>
  );
};
