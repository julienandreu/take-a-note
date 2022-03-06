import React from 'react';
import { Body } from './Body';
import { Editor } from './Editor';
import { Header } from './Header';

const App = () => {
  return (
    <>
      <Header />
      <Body>
        <Editor />
      </Body>
    </>
  );
};

export default App;
