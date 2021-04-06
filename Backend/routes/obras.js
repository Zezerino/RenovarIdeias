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

/* POST obras */
router.post('/', async function(req, res, next) {
  try {
    res.json(await obras.create(req.body));
  } catch (err) {
    console.error(`Erro a criar obras`, err.message);
    next(err);
  }
});


module.exports = router;