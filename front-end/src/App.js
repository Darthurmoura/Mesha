import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import {
  ThemeProvider,
  theme,
  CSSReset
} from '@chakra-ui/react';

// Import context Provider
import Provider from './Context/Provider';

// Import Pages
import Registration from './pages/Registration';
import ApprovalPage from './pages/ApprovalPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <BrowserRouter>
          <Switch>
            <Route exact path="/:nomedocolaborador/registrar">
              <Redirect to='/' />
            </Route>
            <Route exact path="/" component={ Registration } />
            <Route exact path="/registros" component={ AdminPage } />
            <Route exact path="/:nomedocolaborador/validar" component={ ApprovalPage } />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
