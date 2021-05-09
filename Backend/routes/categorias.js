const express = require('express');
const router = express.Router();
const categorias = require('../services/categorias');

/* GET categorias */
router.get('/', async function(req, res, next) {
  try {
    res.json(await categorias.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber categorias`, err.message);
    next(err);
  }
});

router.get('/disponivel', async function(req, res, next) {
  try {
    res.json(await categorias.getAllDisponivel(req.query.page));
  } catch (err) {
    console.error(`Erro a receber categorias disponivel`, err.message);
    next(err);
  }
});



router.get('/view', async function(req, res, next) {
  try {
    res.json(await categorias.getView(req.query.page));
  } catch (err) {
    console.error(`Erro a receber categorias table`, err.message);
    next(err);
  }
});


//ficar sempre no fim dos gets
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await categorias.getId(req.params.id));
  } catch (err) {
    console.error(`Erro a receber categorias id`, err.message);
    next(err);
  }
});



/* POST categorias */
router.post('/', async function(req, res, next) {
  try {
    res.json(await categorias.create(req.body));
  } catch (err) {
    console.error(`Erro a criar categorias`, err.message);
    next(err);
  }
});


/* PUT categorias */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await categorias.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating categorias`, err.message);
    next(err);
  }
});

/* DELETE categorias */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await categorias.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting categorias`, err.message);
    next(err);
  }
});

module.exports = router;