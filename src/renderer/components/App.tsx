import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import { Body } from './Layout/Body';
import { Header } from './Layout/Header';

const App = () => {
  const {
    file: { name = '', content = '' },
  } = useSnapshot(state);
  return (
    <>
      <Header title={name} />
      <Body>{content}</Body>
    </>
  );
};

export default App;
