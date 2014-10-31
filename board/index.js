var path = require('path');
module.exports = {
  model: require(path.join(__dirname, 'model')),
  controller: require(path.join(__dirname, 'controller'))
};
