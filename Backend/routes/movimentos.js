const express = require('express');
const router = express.Router();
const movimentos = require('../services/movimentos');

/* GET movimentos. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await movimentos.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber movimentos`, err.message);
    next(err);
  }
});


router.get('/view', async function(req, res, next) {
  try {
    res.json(await movimentos.getView(req.query.page));
  } catch (err) {
    console.error(`Erro a receber movimentos table`, err.message);
    next(err);
  }
});


/* POST movimentos */
router.post('/', async function(req, res, next) {
  try {
    res.json(await movimentos.create(req.body));
  } catch (err) {
    console.error(`Erro a criar movimentos`, err.message);
    next(err);
  }
});

/* PUT movimentos */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await movimentos.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating movimentos`, err.message);
    next(err);
  }
});

/* DELETE obras */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await movimentos.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting movimentos`, err.message);
    next(err);
  }
});

module.exports = router;