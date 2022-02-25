import React, { useEffect } from 'react';

const App = () => {
  const handlePing = (e) => {
    e.preventDefault();
    window.appContext.sendPing();
  }
  
  useEffect(() => {
    window.appContext.onPingReceive(data => alert(data))
  }, []);

  return (
    <>
    <h1>App Component</h1>
    <button onClick={handlePing}>Ping</button>
    </>
  )
};

export default App;