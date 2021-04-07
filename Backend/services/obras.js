const db = require('./db');
const helper = require('../helper');
const config = require('../config');

/* GET */
async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM obras`, 
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
async function create(obra){
  const result = await db.query(
    `INSERT INTO obras 
    (Nome) 
    VALUES 
    (?)`, 
    [
	obra.Nome
    ]
  );

  let message = 'Erro ao adicionar';

  if (result.affectedRows) {
    message = 'Adicionado com Sucesso';
  }

  return {message};
}

/* UPDATE */

async function update(id, obra){
  const result = await db.query(
    `UPDATE obras 
    SET Nome=?
    WHERE idObra=?`, 
    [
      obra.Nome, id
    ]
  );

  let message = 'Error in updating obras';

  if (result.affectedRows) {
    message = 'Obras updated successfully';
  }

  return {message};
}


module.exports = {
  getAll,
  create,
  update
}