const mysql = require('mysql2/promise');
const config = require('../config');

var connection;




async function connect(){
	connection = await mysql.createConnection(config.db);
}


connect();




async function query(sql, params) {

const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}