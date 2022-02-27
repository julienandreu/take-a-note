import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useAppContext } from '../hooks/use-app-context.hook';
import { state } from '../store';

const App = () => {
  const { sendPing, onPingReceive } = useAppContext();
  const {
    ping: { count = 0 },
  } = useSnapshot(state);

  const handlePing = (mouseClickEvent: React.MouseEvent<HTMLButtonElement>): void => {
    mouseClickEvent.preventDefault();
    sendPing();
  };

  useEffect(() => {
    onPingReceive((data) => {
      alert(data);
      ++state.ping.count;
    });
  }, []);

  return (
    <>
      <Typography variant="h1">App Component</Typography>
      <Button variant="contained" onClick={handlePing}>
        Ping hit {count} times
      </Button>
    </>
  );
};

export default App;
