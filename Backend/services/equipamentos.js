const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM equipamentos`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(equipamento){
  const result = await db.query(
    `INSERT INTO equipamentos 
    (Nome, Codigo, CodigoLongo) 
    VALUES 
    (?, ?, ?)`, 
    [
	equipamento.Nome, equipamento.Codigo, equipamento.CodigoLongo
    ]
  );

  let message = 'Erro ao adicionar';

  if (result.affectedRows) {
    message = 'Adicionado com Sucesso';
  }

  return {message};
}

module.exports = {
  getAll,
  create
}