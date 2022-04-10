import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { store } from './utils/redux';
import Settings from './components/settings-module/Settings';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { AccountingModuleDashboard } from './components/accounting-module/AccountingModuleDashboard';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route //
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route //
            path="/settings"
            element={<Settings />}
          />
          <Route
            path="/accounting_module/*"
            element={<AccountingModuleDashboard />}
          />
          <Route //
            path="/"
            element={<Home />}
          />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
