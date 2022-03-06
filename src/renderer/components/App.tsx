import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import { Body } from './Body';
import { Editor } from './Editor';
import { Header } from './Header';

const App = () => {
  const {
    file: { name = '', content = '' },
  } = useSnapshot(state);
  return (
    <>
      <Header title={name} />
      <Body>
        <Editor />
      </Body>
    </>
  );
};

export default App;
