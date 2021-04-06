const express = require('express');
const router = express.Router();
const movimentacoes = require('../services/movimentacoes');

/* GET movimentos. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await movimentacoes.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber movimentos`, err.message);
    next(err);
  }
});

/* POST movimentos */
router.post('/', async function(req, res, next) {
  try {
    res.json(await movimentacoes.create(req.body));
  } catch (err) {
    console.error(`Erro a criar movimentos`, err.message);
    next(err);
  }
});


module.exports = router;