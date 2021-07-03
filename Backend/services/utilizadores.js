const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function login(utilizador){
    const result = await db.query(
      `SELECT * from utilizadores 
      WHERE nome = ? and password = ?`, 
      [
      utilizador.user, utilizador.pass
      ]
    );
      
    let loginAux = false;
    let message = 'Não foi possível fazer o login';
      
    if (result.length > 0) {
      message = 'Login feito com sucesso';
      loginAux = true;
    }
    

    return loginAux;
  }

  module.exports = {
    login
  }