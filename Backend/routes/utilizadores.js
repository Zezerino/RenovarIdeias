const express = require('express');
const router = express.Router();
const utilizadores = require('../services/utilizadores');


router.post('/login', async function(req, res, next) {
    try {
      res.json(await utilizadores.login(req.body));
    } catch (err) {
      console.error(`Erro ao fazer login`, err.message);
      next(err);
    }
  });


module.exports = router;