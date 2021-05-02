const fs = require('fs');

exports.jsonReader = function (filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch(err) {
      return cb && cb(err);
    }
  });
}

exports.jsonWriter = function(filePath, data, cb) {
  fs.writeFile('./server/books.json', JSON.stringify(data), (err) => {
    if (err) {
      return cb && cb(err);
    } else {
      return cb && cb(null);
    }
  });
}

exports.getUniqueId = function () {
  return new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
}
