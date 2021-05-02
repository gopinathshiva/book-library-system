const { body, validationResult } = require('express-validator')

exports.validate = () => {
  return [
    body('name', `Name doesn't exists`).exists(),
    body('description').optional(),
    body('author', 'Author doesn\'t exists').exists(),
    body('count', 'Count doesn\'t exists').isInt(),
  ];
}

exports.hasValidationErrors = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: errors.array()});
  } else {
    return false;
  }
}
