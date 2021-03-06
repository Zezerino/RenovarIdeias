var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


const app = express();
app.use(cors());

const bodyParser = require('body-parser');

const operadoresRouter = require('./routes/operadores');
const equipamentosRouter = require('./routes/equipamentos');
const movimentosRouter = require('./routes/movimentos');
const obrasRouter = require('./routes/obras');
const categoriasRouter = require('./routes/categorias');
const utilizadoresRouter = require('./routes/utilizadores');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/uploads', express.static('uploads'));
app.use('/operadores', operadoresRouter);
app.use('/categorias', categoriasRouter);
app.use('/equipamentos', equipamentosRouter);
app.use('/movimentos', movimentosRouter);
app.use('/obras', obrasRouter);
app.use('/utilizadores', utilizadoresRouter);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
