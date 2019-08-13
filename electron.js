// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Tray
} = require('electron')


let tray, window


app.dock.hide()

const createWindow = () => {

  // Create the browser window.
  window = new BrowserWindow({
    show: false,
    frame: false,
    width: 900,
    height: 420,
    fullscreenable: false,
    resizable: false
  })

  // and load the url for messages.
  window.loadURL('https://messages.android.com/')

  // Hide the window when it loses focus
  window.on('blur', () => {
    window.hide()
  })
}

// shows/hides the window
const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
}

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height)
  return {
    x: x,
    y: y
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
}

const createTray = () => {
  tray = new Tray('message.png')
  tray.on('click', function () {
    toggleWindow()
  })
}

app.on('ready', () => {
  createTray()
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})