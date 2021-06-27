const express = require('express');
const router = express.Router();
const equipamentos = require('../services/equipamentos');
const multer = require('multer');


const storage = multer.diskStorage(
  {
  destination: function(req, file, cb){
    console.log(req.body.idEquipamento);
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, req.body.idEquipamento + ".png");
  }
});

const upload = multer({storage: storage});

/* GET equipamentos */
router.get('/', async function(req, res, next) {
  try {
    res.json(await equipamentos.getAll(req.query.page));
  } catch (err) {
    console.error(`Erro a receber equipamentos`, err.message);
    next(err);
  }
});


router.get('/disponivel', async function(req, res, next) {
  try {
    res.json(await equipamentos.getAllDisponivel(req.query.page));
  } catch (err) {
    console.error(`Erro a receber equipamentos disponivel`, err.message);
    next(err);
  }
});

router.get('/ndisponivel', async function(req, res, next) {
  try {
    res.json(await equipamentos.getAllInDisponivel(req.query.page));
  } catch (err) {
    console.error(`Erro a receber equipamentos indisponivel`, err.message);
    next(err);
  }
});


router.get('/view', async function(req, res, next) {
  try {
    res.json(await equipamentos.getView(req.query.page));
  } catch (err) {
    console.error(`Erro a receber equipamentos table`, err.message);
    next(err);
  }
});


//ficar sempre no fim dos gets
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await equipamentos.getId(req.params.id));
  } catch (err) {
    console.error(`Erro a receber equipamentos id`, err.message);
    next(err);
  }
});

/* POST equipamentos */
router.post('/', upload.single('imagemEquipamento') ,async function(req, res, next) {
  try {
    res.json(await equipamentos.create(req.body));
  } catch (err) {
    console.error(`Erro a criar equipamentos`, err.message);
    next(err);
  }
});

/* PUT equipamentos */
router.put('/:id',  upload.single('imagemEquipamento'),async function(req, res, next) {
  try {
    console.log(req.body);
    res.json(await equipamentos.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating equipamentos`, err.message);
    next(err);
  }
});

router.put('/entradas/:id', async function(req, res, next) {
  try {
    res.json(await equipamentos.updateEntradas(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating equipamentos entradas`, err.message);
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