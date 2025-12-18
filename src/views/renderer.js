
function logar() {

  const loginUsuario = document.getElementById('loginUsuario').value;
  const senhaUsuario = document.getElementById('senhaUsuario').value;

  if (loginUsuario === 'admin' && senhaUsuario === 'admin') {
    console.log(loginUsuario, senhaUsuario);
    api.open();
    return;
  }

  alert('Senha ou login incorretos!');
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
            