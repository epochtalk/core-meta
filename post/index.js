var path = require('path');
var Operations = require(path.join(__dirname, '..', 'operations'));
module.exports = {
  onPut: function(key) {
    Operations.getParentKey({key: key, callback: function(parentKey) {
      // Call increment on parentKey's postCount
      Operations.increment({
        key: parentKey,
        field: 'postCount',
        recursive: true
      });
    }});
  },
  onDel: function(key, tree) {
    Operations.getParentKey({key: key, callback: function(parentKey) {
      // Call decrement on parentKey's postCount
      Operations.decrement({
          key: parentKey,
          field: 'postCount',
          recursive: true
      });
    }});
  }
};
