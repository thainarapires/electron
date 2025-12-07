//console.log("Processo Principal")
console.log(`Electron: ${process.versions.electron}`)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog } = require('electron')
const { error } = require('node:console')
const path = require('node:path')

// Janela Login

const loginWindow = () => {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/logo.png',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    //autoHideMenuBar: true,
    //titleBarStyle: 'hidden'
  })
  // menu personalizado

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  nativeTheme.themeSource = 'dark'
  win.loadFile('./src/views/index.html')
}

//Janela sobre 

const aboutWindow = () => {
  const about = new BrowserWindow({
    width: 360,
    height: 220,
    icon: './src/public/img/logo.png',
    resizable: false,
    autoHideMenuBar: true,
  })

  // Janela menu principal

  about.loadFile('./src/views/sobre.html')
}

// Janela menu principal

const mainWindow = () => {
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    const main = new BrowserWindow({
      width: 640,
      height: 480,
      icon: './src/public/img/logo.png',
      resizable: false,
      autoHideMenuBar: true,
      parent: father, //hierarquia de janelas
      modal: true //o usuario so pode na tela da frente, a de trás nao pode mexer
    })
    main.loadFile('./src/views/menu-principal.html')
  }

}

app.whenReady().then(() => {
  loginWindow()

  //IPC >>>
  ipcMain.on('logou', () => {
    mainWindow()
  })

  ipcMain.on('renderer-message', (event, message) => {
    console.log(`Processo principal recebeu uma mensagem: ${message}`)
    event.reply('main-message', 'ola renderizadorrrr')
  })

  ipcMain.on('dialog-info', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'informacao',
      message: 'mensagem',
      buttons: ['OK']
    })
  }
  )

  ipcMain.on('dialog-warning', () => {
    dialog.showMessageBox({
      type: 'warning',
      title: 'Warning',
      message: 'Confirma?',
      buttons: ['Sim', 'Nao'],
      defaultId: 0
    }).then((result) => {
      console.log(result)
      if (result.response === 0) {
        console.log('confirmou')
      } else {
        console.log('recusou')
      }
    })
  }
  )

  ipcMain.on('dialog-select', () => {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then((result) => {
      console.log(result)

    }).catch(error => {
      console.log(error)
    })
  }
  )
  //<<

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) loginWindow()
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});



// Template do menu

const template = [
  {
    label: 'Arquivo',
    submenu: [
      {
        label: 'Janela secundaria',
        click: () => mainWindow(),
        accelerator: 'Alt+F4'
      },
      {
        label: 'Sair',
        click: () => app.quit(),
        accelerator: 'Alt+F4'
      }
    ]
  },
  {
    label: 'Exibir',
    submenu: [
      {
        label: 'Recarregar',
        role: 'reload',
      },
      {
        label: 'Ferramentas do desenvolvedor',
        role: 'toggleDevTools',
      },
      {
        type: 'separator'
      },
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir zoom',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar zoom',
        role: 'resetZoom'
      },

    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Docs',
        click: () => shell.openExternal('https://www.youtube.com/watch?v=2_FuAfOjM1E&list=PLbEOwbQR9lqybf2ehSR-KWEv_0g-HDJ50&index=5')
      },
      {
        type: 'separator'
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  },
]