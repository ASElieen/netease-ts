import React from 'react';
import { GlobalStyle } from './style';
import {RouterConfig} from './router/routerConfig'


function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <RouterConfig/>
    </div>
  );
}

export default App;
