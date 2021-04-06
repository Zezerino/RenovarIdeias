const express = require('express');
const router = express.Router();
const equipamentos = require('../services/equipamentos');

/* GET equipamentos */
router.get('/', async function(req, res, next) {
  try {
    res.json(await equipamentos.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber equipamentos`, err.message);
    next(err);
  }
});


/* POST equipamentos */
router.post('/', async function(req, res, next) {
  try {
    res.json(await equipamentos.create(req.body));
  } catch (err) {
    console.error(`Erro a criar equipamentos`, err.message);
    next(err);
  }
});

module.exports = router;