const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM movimentos`, 
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
    `SELECT m.tipo, m.data, w.nomeOperador as nomeOperador, o.nomeObra as nomeObra, e.nomeEquipamento as nomeEquipamento, IF(estadoFunciona, 'Funciona', 'Não Funciona') estadoFunciona, IF(estadoLimpo, 'Limpo', 'Sujo') estadoLimpo FROM movimentos m, obras o, equipamentos e, operadores w where m.idOperador = w.idOperador and m.idEquipamento = e.idEquipamento and m.idObra = o.idObra`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function create(movimento){
  const result = await db.query(
    `INSERT INTO movimentos 
    (tipo, data, idOperador, idObra, idEquipamento, estadoFunciona, estadoLimpo) 
    VALUES 
    (?, current_timestamp(), ?, ?, ?, ?, ?)`, 
    [
	movimento.tipo, movimento.idOperador, movimento.idObra, movimento.idEquipamento, movimento.estadoFunciona, movimento.estadoLimpo
    ]
  );

  let message = 'Erro ao adicionar';

  if (result.affectedRows) {
    message = 'Adicionado com Sucesso';
  }

  return {message};
}

/* UPDATE */

async function update(id, movimento){
  const result = await db.query(
    `UPDATE movimentos 
    SET tipo=?, data=current_timestamp(), idOperador=?, idObra=?, idEquipamento=?, estadoFunciona=?, estadoLimpo=?
    WHERE idMovimento=?`, 
    [
      movimento.tipo, movimento.idOperador, movimento.idObra, movimento.idEquipamento, movimento.estadoFunciona, movimento.estadoLimpo , id
    ]
  );

  let message = 'Error in updating movimentos';

  if (result.affectedRows) {
    message = 'movimentos updated successfully';
  }

  return {message};
}

/* DELETE */

async function remove(id){
  const result = await db.query(
    `DELETE FROM movimentos WHERE idMovimento=?`, 
    [id]
  );

  let message = 'Error in deleting movimentos';

  if (result.affectedRows) {
    message = 'movimentos language deleted successfully';
  }

  return {message};
}


module.exports = {
  getAll,
  create,
  update,
  remove,
  getView
}