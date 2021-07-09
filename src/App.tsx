import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import generateStore from './redux/store';
import Onboarding from './components/Onboarding';
import Settings from './components/Settings';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  const store = generateStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/onboarding">
            <Onboarding />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/accounting_module_dashboard">
            <p>Accounting module</p>
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
