const express = require('express');
const router = express.Router();
const operadores = require('../services/operadores');

/* GET operadores */
router.get('/', async function(req, res, next) {
  try {
    res.json(await operadores.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber operadores`, err.message);
    next(err);
  }
});

router.get('/disponivel', async function(req, res, next) {
  try {
    res.json(await operadores.getAllDisponivel(req.query.page));
  } catch (err) {
    console.error(`Erro a receber operadores disponivel`, err.message);
    next(err);
  }
});

router.get('/view', async function(req, res, next) {
  try {
    res.json(await operadores.getView(req.query.page));
  } catch (err) {
    console.error(`Erro a receber operadores table`, err.message);
    next(err);
  }
});


//ficar sempre no fim dos gets
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await operadores.getId(req.params.id));
  } catch (err) {
    console.error(`Erro a receber operadores id`, err.message);
    next(err);
  }
});


/* POST operadores */
router.post('/', async function(req, res, next) {
  try {
    res.json(await operadores.create(req.body));
  } catch (err) {
    console.error(`Erro a criar operadores`, err.message);
    next(err);
  }
});

/* PUT operadores */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await operadores.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating operadores`, err.message);
    next(err);
  }
});

/* DELETE operadores */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await operadores.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting operadores`, err.message);
    next(err);
  }
});


module.exports = router;