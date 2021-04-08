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

/* PUT equipamentos */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await equipamentos.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating equipamentos`, err.message);
    next(err);
  }
});

/* DELETE obras */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await equipamentos.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting equipamentos`, err.message);
    next(err);
  }
});

module.exports = router;