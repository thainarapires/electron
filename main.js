//console.log("Processo Principal")
const { app, BrowserWindow, nativeTheme } = require('electron')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/logo.png',
    //resizable: false
    //autoHideMenuBar: true,
    //titleBarStyle: 'hidden'
  })

  nativeTheme.themeSource = 'dark'

  win.loadFile('src/views/index.html')
}

app.whenReady().then(() => {
  createWindow()
})