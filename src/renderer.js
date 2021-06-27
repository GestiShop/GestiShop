/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  })
 * ```
 */

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import App from './App'
import './i18n'
import './styles/App.css'
import '@fontsource/roboto'

window.require('dotenv').config()

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#6D72C3',
            main: '#5941A9',
            dark: '#1D1128',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FF7961',
            main: '#F44336',
            dark: '#BA000D',
            contrastText: '#000000'
        }
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root'))
