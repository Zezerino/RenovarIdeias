const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'renovarideias',
  },
  listPerPage: 10,
};


module.exports = config;