const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/* GET */
async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM categoria`, 
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
    `SELECT c.idCategoria, c.nomeCategoria FROM categoria c`, 
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
    FROM categoria
    WHERE idCategoria=?`, 
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
    FROM categoria`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


/* POST */
async function create(categoria){
  const result = await db.query(
    `INSERT INTO categoria 
    (nomeCategoria) 
    VALUES 
    (?)`, 
    [
	categoria.nomeCategoria
    ]
  );

  let message = 'Erro ao adicionar';

  if (result.affectedRows) {
    message = 'Adicionado com Sucesso';
  }

  return {message};
}

/* UPDATE */

async function update(id, categoria){
  const result = await db.query(
    `UPDATE categoria 
    SET nomeCategoria=?
    WHERE idCategoria=?`, 
    [
      categoria.nomeCategoria, id
    ]
  );

  let message = 'Error in updating categoria';

  if (result.affectedRows) {
    message = 'Categoria updated successfully';
  }

  return {message};
}

/* DELETE */


async function remove(id){
  const result = await db.query(
    `DELETE FROM categoria WHERE idCategoria=?`, 
    [id]
  );

  let message = 'Error in deleting Categoria';

  if (result.affectedRows) {
    message = 'Categoria language deleted successfully';
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