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

async function getView(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT w.idOperador, w.nomeOperador, w.estadoOperador FROM operadores w`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function getId(id){
  const offset = helper.getOffset(config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM operadores
    WHERE idOperador=?`, 
    [id
    ]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


async function getAllDisponivel(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM operadores
    WHERE estadoOperador = 1`, 
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
    (nomeOperador, estadoOperador) 
    VALUES 
    (?, ?)`, 
    [
	operador.nomeOperador, operador.estadoOperador
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
      operador.nomeOperador, id
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
  remove,
  getView,
  getId,
  getAllDisponivel
}