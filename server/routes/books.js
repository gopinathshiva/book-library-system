const express = require('express');
const { jsonReader, jsonWriter, getUniqueId } = require('../utils');
const { validate, hasValidationErrors } = require('../validate-request');

const jsonFilePath = './server/books.json';
const router = express.Router();

router.get('/', (req, res, next) => {
  jsonReader(jsonFilePath, (err, books) => {
    if (err) {
      next('Error parsing file:', err);
    } else {
      res.json({message: 'successfully retrieved all books', books});
    }
  });
});

router.get('/:id', (req, res, next) => {
  jsonReader(jsonFilePath, (err, books) => {
    if (err) {
      next('Error parsing file:', err);
    } else {
      res.json(books.find(book => book.id === req.params.id) || {});
    }
  })
});

router.post('/', validate(), (req, res, next) => {
  jsonReader(jsonFilePath, (err, books) => {
    if (err) {
      next(err);
    }
    if (!hasValidationErrors(req, res)) {
      const book = {
        ...req.body,
        id: getUniqueId(),
      };
      books.push(book);
      jsonWriter(jsonFilePath, books, (err) => {
        if(!err){
          res.json({message: `successfully created book id ${book.id}`, book})
        }
      });
    }
  })
});

router.put('/', validate(), (req, res, next) => {
  jsonReader('./server/books.json', (err, books) => {
    if (err) {
      next(err);
      return
    }
    const requiredBookIndex = books.findIndex(book => book.id === req.body.id);
    if (requiredBookIndex < 0) {
      return next(`book not found with id ${req.body.id}`);
    }
    books[requiredBookIndex] = req.body;
    jsonWriter(jsonFilePath, books, (err) => {
      if(!err){
        res.json({message: `successfully updated book id ${req.body.id}`, book: req.body});
      }
    });
  });
});

router.delete('/:id', (req, res) => {
  jsonReader('./server/books.json', (err, books) => {
    if (err) {
      next(err);
      return
    }
    const requiredBookIndex = books.findIndex(book => book.id === req.params.id);
    books.splice(requiredBookIndex, 1);
    jsonWriter(jsonFilePath, books, (err) => {
      if(!err){
        res.json({message: `successfully deleted book id ${req.params.id}`, id: req.params.id});
      }
    })
  })
});

module.exports = router;
