module.exports = {
  getFile(id, cb) {
    return require('fs').readFile(`${id}.txt`, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        cb(data);
      }
    });
  }
};
