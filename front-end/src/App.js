import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  theme,
  CSSReset
} from '@chakra-ui/react';

// Import context Provider
import Provider from './Context/Provider';

// Import Pages
import Registration from './pages/Registration';

// Import Components
import ThemeToggler from './components/ThemeToggler';

function App() {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ThemeToggler />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Registration } />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
