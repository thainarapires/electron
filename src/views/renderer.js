/* renderizar */
function logar() {
  api.open()
}     

function info(){
 api.info()
}

function warning(){
 api.warning()
}

function select(){
 api.select()
}

api.send('oiimmm')
api.on((event ,message) => {
    console.log(`processo recebeu ${message}`)
})
            