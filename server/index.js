const express = require('express');
const booksRoute = require('./routes/books');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
  next();
});

app.use('/books', booksRoute);

app.get('*', function (req, res, next) {
  const error = new Error(
    `${req.ip} tried to access ${req.url}`,
  );
  error.statusCode = 301;
  next(error);
});

/*
 * Error handler
 */
app.use((error, req, res, next) => {
  console.log('error handler');
  console.log(error);
  if (!error.statusCode) {
    console.log('inside');
    error.statusCode = 500;
  }

  if (error.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }
  console.log(error.statusCode);
  return res
    .status(500)
    .json({ error: error.toString() });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
