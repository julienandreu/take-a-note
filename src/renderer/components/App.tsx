import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useAppContext } from '../hooks/use-app-context';

const App = () => {
  const { sendPing, onPingReceive } = useAppContext();

  const handlePing = (mouseClickEvent: React.MouseEvent<HTMLButtonElement>): void => {
    mouseClickEvent.preventDefault();
    sendPing();
  };

  useEffect(() => {
    onPingReceive((data) => alert(data));
  }, []);

  return (
    <>
      <Typography variant="h1">App Component</Typography>
      <Button variant="contained" onClick={handlePing}>
        Ping
      </Button>
    </>
  );
};

export default App;
