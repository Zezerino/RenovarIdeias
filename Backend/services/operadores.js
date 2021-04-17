const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM operadores`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(operador){
  const result = await db.query(
    `INSERT INTO operadores 
    (nomeOperador) 
    VALUES 
    (?)`, 
    [
	operador.Nome
    ]
  );

  let message = 'Erro ao adicionar';

  if (result.affectedRows) {
    message = 'Adicionado com Sucesso';
  }

  return {message};
}


/* UPDATE */

async function update(id, operador){
  const result = await db.query(
    `UPDATE operadores 
    SET nomeOperador=?
    WHERE idOperador=?`, 
    [
      operador.Nome, id
    ]
  );

  let message = 'Error in updating operadores';

  if (result.affectedRows) {
    message = 'Operadores updated successfully';
  }

  return {message};
}

/* DELETE */


async function remove(id){
  const result = await db.query(
    `DELETE FROM operadores WHERE idOperador=?`, 
    [id]
  );

  let message = 'Error in deleting operadores';

  if (result.affectedRows) {
    message = 'Operadores language deleted successfully';
  }

  return {message};
}

module.exports = {
  getAll,
  create,
  update,
  remove
}