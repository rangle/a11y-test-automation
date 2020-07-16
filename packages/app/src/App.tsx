import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Text } from '@rangleio/chord';
import { Tabs, theme } from './components';
import './App.css';


function App() {
  return (
    <ThemeProvider theme={theme.light}>
        <header>
          <Text as='h1' variant='body'>The Demo</Text>
        </header>
        <Tabs id='tabsDemo' initialTab={'2'} />
    </ThemeProvider>
  );
}

export default App;
