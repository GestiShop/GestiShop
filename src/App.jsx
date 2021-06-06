import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Switch } from 'react-router'
import generateStore from './redux/store'
import './App.css'

import Home from './components/Home'
import Onboarding from './components/Onboarding'
import Settings from './components/Settings'
import NotFound from './components/NotFound'

const App = () => {
    const store = generateStore()
    return (
        <React.StrictMode>
            <Provider store={store}>
                <MemoryRouter>
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route exact path='/onboarding'>
                            <Onboarding/>
                        </Route>
                        <Route exact path='/settings'>
                            <Settings/>
                        </Route>
                        <Route>
                            <NotFound/>
                        </Route>
                    </Switch>
                </MemoryRouter>
            </Provider>
        </React.StrictMode>
    )
}

export default App
