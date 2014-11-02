var path = require('path');
var Operations = require(path.join(__dirname, '..', 'operations'));
module.exports = {
  onPut: function(key) {
    // Get parent thread
    // Call increment on parentKey
    var options = {
      key: parentKey,
      field: 'postCount',
      recursive: true
    };
    Operations.increment(options);
  },
  onDel: function(key) {
    // Get parent thread
    // Call decrement on parentKey
    var options = {
      key: parentKey,
      field: 'postCount',
      recursive: true
    };
    Operations.decrement(options);
  }
};
