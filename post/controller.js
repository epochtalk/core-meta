var path = require('path');
var Operations = require(path.join(__dirname, '..', 'operations'));
var controller = module.exports = {};

controller.onPut = function(key) {
  // Don't create new post metadata for the key
  // Get parentKey
  // Call increment on parentKey
  var options = {
    key: parentKey,
    field: 'postCount',
    recursive: true
  };
  Operations.increment(options);
};

controller.onDel = function(key) {
  // Don't create new post metadata for the key
  // Get parentKey
  // Call decrement on parentKey
  var options = {
    key: parentKey,
    field: 'postCount',
    recursive: true
  };
  Operations.decrement(options);
};
