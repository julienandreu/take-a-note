import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import { Body } from './Layout/Body';
import { Editor } from './Layout/Editor';
import { Header } from './Layout/Header';

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
