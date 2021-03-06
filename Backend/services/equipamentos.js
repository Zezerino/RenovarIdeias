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

async function getView(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT e.idEquipamento, e.codigoLongo, e.nomeEquipamento, c.nomeCategoria as nomeCategoria ,e.estadoEquipamento FROM equipamentos e, categoria c where e.idCategoria = c.idCategoria`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getCategoriaId(id){
  const offset = helper.getOffset(config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM equipamentos
    WHERE idCategoria=?`, 
    [id
    ]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


async function getId(id){
  const offset = helper.getOffset(config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM equipamentos
    WHERE idEquipamento=?`, 
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
    FROM equipamentos
    WHERE estadoEquipamento = 1 && estadoEntrega = 0`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getAllInDisponivel(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM equipamentos
    WHERE estadoEquipamento = 1 && estadoEntrega = 1`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


// POST
async function create(equipamento){
  const result = await db.query(
    `INSERT INTO equipamentos 
    (idEquipamento, codigoLongo, nomeEquipamento, idCategoria,estadoEquipamento, estadoEntrega) 
    VALUES 
    (?, ?, ?, ?, ?, 1)`, 
    [
	equipamento.idEquipamento, equipamento.codigoLongo, equipamento.nomeEquipamento,  equipamento.idCategoria,equipamento.estadoEquipamento
    ]
  );

  let message = 'Erro ao adicionar um novo equipamento';

  if (result.affectedRows) {
    message = 'Adicionado com Sucesso';
  }

  return {message};
}

/* UPDATE */


//update all
async function update(id, equip){
  const result = await db.query(
    `UPDATE equipamentos 
    SET idEquipamento=?, codigoLongo=?, nomeEquipamento=?, idCategoria=?, estadoEquipamento=?
    WHERE idEquipamento=?`, 
    [
      equip.idEquipamento, equip.codigoLongo, equip.nomeEquipamento, equip.idCategoria, equip.estadoEquipamento , id
    ]
  );

  let message = 'Error in updating Equipamentos';

  if (result.affectedRows) {
    message = 'Equipamentos updated successfully';
  }

  return {message};
}


//update estado entrega
async function updateEntradas(id, equip){
  const result = await db.query(
    `UPDATE equipamentos 
    SET estadoEntrega=?
    WHERE idEquipamento=?`, 
    [
      equip.estadoEntrega, id
    ]
  );

  let message = 'Error in updating Equipamentos entrega';

  if (result.affectedRows) {
    message = 'Equipamentos entrega updated successfully';
  }

  return {message};
}



/* DELETE */

async function remove(id){
  const result = await db.query(
    `DELETE FROM equipamentos WHERE idEquipamento=?`, 
    [id]
  );

  let message = 'Error in deleting equipamento';

  if (result.affectedRows) {
    message = 'Equipamentos language deleted successfully';
  }

  return {message};
}

module.exports = {
  getAll,
  create,
  update,
  updateEntradas,
  remove,
  getView,
  getCategoriaId,
  getId,
  getAllDisponivel,
  getAllInDisponivel

}