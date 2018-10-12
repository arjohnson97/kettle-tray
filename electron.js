
// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Tray} = require('electron')
const electron = require('electron')

const path = require('path')

let tray, window


app.dock.hide()

function createWindow () {

  // Create the browser window.
  window = new BrowserWindow({
    show: false,
    frame: false,
    width: 900,
    height: 420,
    fullscreenable: false,
    resizable: false
})
window.maximize()

  // and load the index.html of the app.
  window.loadURL('https://messages.android.com/')

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
        window.hide()
    }
})
}

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow(); 
}

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();
  
  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4)
  return {x: x, y: y}
}

const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
}

function createTray () {
  tray = new Tray('message.png')
  tray.on('click', function (event) {
toggleWindow()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createTray()
  createWindow()
  
}
)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
