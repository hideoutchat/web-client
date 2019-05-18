import React from 'react';
import { ThemeProvider } from 'styled-components';

import createRedux from './redux';
import createRoutes from './routes';
import createTheme from './themes/dark';
import { render } from 'react-dom';

const createApp = () => {
  const Redux = createRedux();
  const Routes = createRoutes();
  const theme = createTheme();

  return <ThemeProvider theme={theme}>
    <Redux>
      <Routes/>
    </Redux>
  </ThemeProvider>;
};

render(createApp(), document.querySelector('div'));
