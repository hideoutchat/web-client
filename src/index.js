import React from 'react';
import { ThemeProvider } from 'styled-components';

import createRedux from './redux';
import createRoutes from './routes';
import createTheme from './themes/dark';
import { render } from 'react-dom';

const createApp = () => {
  const Redux = createRedux({
    resources: [
      {
        attributes: {
          displayName: 'Alice'
        },
        id: 'alice',
        type: 'member'
      },
      {
        attributes: {
          displayName: 'Bob'
        },
        id: 'bob',
        type: 'member'
      },
      {
        id: 'self',
        relationships: {
          member: {
            id: 'alice',
            type: 'member'
          }
        },
        type: 'self'
      }
    ]
  });
  const Routes = createRoutes();
  const theme = createTheme();

  return <ThemeProvider theme={theme}>
    <Redux>
      <Routes/>
    </Redux>
  </ThemeProvider>;
};

render(createApp(), document.querySelector('div'));
