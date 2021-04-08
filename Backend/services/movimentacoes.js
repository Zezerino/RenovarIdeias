const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM movimentacoes`, 
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
    `SELECT m.tipo, m.Data, w.Nome as nomeOperador, o.Nome as nomeObra, e.Nome as nomeEquipamento, m.EstadoNaEntregaFunciona, m.EstadoNaEntregaLimpar FROM movimentacoes m, obras o, equipamentos e, operadores w where m.idOperador = w.idOperador and m.idEquipamento = e.idEquipamento and m.idObra = o.idObra`, 
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
    `INSERT INTO movimentacoes 
    (Tipo, Data, idOperador, idObra, idEquipamento, EstadoNaEntregaFunciona, EstadoNaEntregaLimpar) 
    VALUES 
    (?, current_timestamp(), ?, ?, ?, ?, ?)`, 
    [
	movimento.Tipo, movimento.idOperador, movimento.idObra, movimento.idEquipamento, movimento.EstadoNaEntregaFunciona, movimento.EstadoNaEntregaLimpar
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
    `UPDATE movimentacoes 
    SET Tipo=?, Data=current_timestamp(), idOperador=?, idObra=?, idEquipamento=?, EstadoNaEntregaFunciona=?, EstadoNaEntregaLimpar=?
    WHERE idMovimento=?`, 
    [
      movimento.Tipo, movimento.idOperador, movimento.idObra, movimento.idEquipamento, movimento.EstadoNaEntregaFunciona, movimento.EstadoNaEntregaLimpar , id
    ]
  );

  let message = 'Error in updating movimentacoes';

  if (result.affectedRows) {
    message = 'Movimentacoes updated successfully';
  }

  return {message};
}

/* DELETE */

async function remove(id){
  const result = await db.query(
    `DELETE FROM movimentacoes WHERE idMovimento=?`, 
    [id]
  );

  let message = 'Error in deleting movimentacoes';

  if (result.affectedRows) {
    message = 'Movimentacoes language deleted successfully';
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