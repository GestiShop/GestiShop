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

window.require('dotenv').config()

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5941A9'
        },
        secondary: {
            main: '#6D72C3'
        }
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>,
    document.getElementById('root'))
