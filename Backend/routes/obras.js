const express = require('express');
const router = express.Router();
const obras = require('../services/obras');

/* GET obras */
router.get('/', async function(req, res, next) {
  try {
    res.json(await obras.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber obras`, err.message);
    next(err);
  }
});

router.get('/disponivel', async function(req, res, next) {
  try {
    res.json(await obras.getAllDisponivel(req.query.page));
  } catch (err) {
    console.error(`Erro a receber obras disponivel`, err.message);
    next(err);
  }
});



router.get('/view', async function(req, res, next) {
  try {
    res.json(await obras.getView(req.query.page));
  } catch (err) {
    console.error(`Erro a receber obras table`, err.message);
    next(err);
  }
});


//ficar sempre no fim dos gets
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await obras.getId(req.params.id));
  } catch (err) {
    console.error(`Erro a receber obras id`, err.message);
    next(err);
  }
});



/* POST obras */
router.post('/', async function(req, res, next) {
  try {
    res.json(await obras.create(req.body));
  } catch (err) {
    console.error(`Erro a criar obras`, err.message);
    next(err);
  }
});


/* PUT obras */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await obras.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating obras`, err.message);
    next(err);
  }
});

/* DELETE obras */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await obras.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting obras`, err.message);
    next(err);
  }
});

module.exports = router;