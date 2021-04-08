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

/* PUT movimentos */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await movimentacoes.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating movimentos`, err.message);
    next(err);
  }
});

/* DELETE obras */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await movimentacoes.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting movimentacoes`, err.message);
    next(err);
  }
});

module.exports = router;