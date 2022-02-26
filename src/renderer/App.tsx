import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

const App = () => {
  const handlePing = (mouseClickEvent: React.MouseEvent<HTMLButtonElement>): void => {
    mouseClickEvent.preventDefault();
    window.appContext.sendPing();
  };

  useEffect(() => {
    window.appContext.onPingReceive((data) => alert(data));
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
