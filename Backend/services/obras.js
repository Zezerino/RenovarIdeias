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
    (nomeObra, localObra) 
    VALUES 
    (?, ?)`, 
    [
	obra.nomeObra, obra.localObra
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
    SET nomeObra=?
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

/* DELETE */


async function remove(id){
  const result = await db.query(
    `DELETE FROM obras WHERE idObra=?`, 
    [id]
  );

  let message = 'Error in deleting obras';

  if (result.affectedRows) {
    message = 'Obras language deleted successfully';
  }

  return {message};
}



module.exports = {
  getAll,
  create,
  update,
  remove
}