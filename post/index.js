var path = require('path');
var Operations = require(path.join(__dirname, '..', 'operations'));
module.exports = {
  onPut: function(options) {
    Operations.getParentKey({key: options.key, callback: function(parentKey) {
      // Call increment on parentKey's postCount
      Operations.increment({
        key: parentKey,
        field: 'post_count',
        recursive: true
      });
    }});
  },
  onDel: function(options) {
    Operations.getParentKey({key: options.key, callback: function(parentKey) {
      // Call decrement on parentKey's postCount
      Operations.decrement({
          key: parentKey,
          field: 'post_count',
          recursive: true
      });
    }});
  }
};
