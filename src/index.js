import React from 'react';
import { ThemeProvider } from 'styled-components';

import createRedux from './redux';
import createRoutes from './routes';
import createTheme from './themes/dark';
import { render } from 'react-dom';

const createApp = () => {
  const Redux = createRedux({
    name: '',
    peers: [
      {
        activity: 'Last seen a few minutes ago',
        id: 'X9gaLhQnvh7nfKovSsa+nWpl1E3JAfBpkzPft+bwbl37',
        name: 'degenerate porcupine'
      },
      {
        activity: 'Last seen a moment ago',
        id: 'FhVgu1sGp6AeC4xt54/r9GS06FuKzRJsLBjLBHAzFI0f',
        name: 'vile minion'
      },
      {
        activity: 'Last seen an hour ago',
        id: 'ryXx9Pv8hFeOa/OlYIed9I0QEIDvEL+sLsm0tDJs66+r',
        name: 'Felix'
      },
      {
        activity: 'Last seen a moment ago',
        id: 'S/NH8maAA51ypFTXt/0W4xOfZUtHaTBoORqJVALHvOZP',
        name: 'dracula turpentine'
      },
      {
        activity: 'Last seen 2 hours ago',
        id: 'se5nURm9yFJaJECBOFwWQW0yA62ZMvdNvWXvGyrtNr6Z',
        name: 'Gary Florence'
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
