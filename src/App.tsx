import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { store } from './utils/redux';
import Settings from './components/settings-module/Settings';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AccountingModuleDashboard from './components/accounting-module/AccountingModuleDashboard';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route path="/accounting_module">
            <AccountingModuleDashboard />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
