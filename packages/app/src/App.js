import React from 'react';
import { ThemeProvider } from 'styled-components';
import logo from './logo.svg';
import { Text } from '@rangleio/chord';
import { Button } from './components';
import { theme } from './components';
import './App.css';


function App() {
  return (
    <ThemeProvider theme={theme.dark}>
        <header className="App-header">
          <h1><Text></Text></h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button>DS Button</Button>
          <Button as="a" href="#!">DS Link</Button>
        </header>
    </ThemeProvider>
  );
}

export default App;
