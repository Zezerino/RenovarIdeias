const express = require('express');
const router = express.Router();
const operadores = require('../services/operadores');

/* GET operadores */
router.get('/', async function(req, res, next) {
  try {
    res.json(await operadores.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* POST operadores */
router.post('/', async function(req, res, next) {
  try {
    res.json(await operadores.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});


module.exports = router;