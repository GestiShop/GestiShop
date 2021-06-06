import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Switch } from 'react-router'
import generateStore from './redux/store'
import './App.css'

import Home from './components/Home'

const App = () => {
    const store = generateStore()
    return (
        <React.StrictMode>
            <Provider store={store}>
                <MemoryRouter>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </MemoryRouter>
            </Provider>
        </React.StrictMode>
    );
}

export default App
