const express = require('express');
const router = express.Router();
const obras = require('../services/obras');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await obras.getAll(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;