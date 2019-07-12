'use strict'

import { app, BrowserWindow, screen } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { PrometheusDaemon } from 'prometheus-neon'

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow, prometheusDaemon

function createMainWindow() {
  var mainScreen = screen.getPrimaryDisplay()

  const window = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    minWidth: 1024,
    minHeight: 800,
    width: ( mainScreen.size.width / 3.0 ) * 2.0,
    height: ( mainScreen.size.height / 3.0 ) * 2.0,
  })

  if (isDevelopment) {
    window.webContents.openDevTools()
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    prometheusDaemon.done()
    prometheusDaemon = null
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  //if (process.platform !== 'darwin') {
    app.quit()
  //}
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  try {
    console.log('Instatiating PrometheusDaemon...')
    prometheusDaemon = new PrometheusDaemon()
    console.log('PrometheusDaemon is running')
  }
  catch(err) {
    console.log('Error while instatiating PrometheusDaemon:')
    console.log(err)
  }
  mainWindow = createMainWindow()
})
