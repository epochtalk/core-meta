var path = require('path');
var vault = require(path.join(__dirname, 'vault'));
var Operations = module.exports = {};
var tree;

Operations.init = function(inputTree) {
  tree = inputTree;
};

Operations.getParentKey = function(options) {
  var q = {gt: options.key.concat(null), lt: options.key.concat(undefined), limit: 1};
  var parentKey = null;
  tree.roots.createReadStream(q).on('data', function(ch) {
    parentKey = [ch.key[2], ch.key[3]];
  }).on('end', function() {
    options.callback(parentKey);
  });
};

// options: key, callback
Operations.getValue = function(options) {
  // TODO: createReadStream here
  tree.meta.get(options.key, function(err, value) {
    options.callback(err, value);
  });
};

Operations.updateValue = function(options) {
  var key = options.key;
  var lock = vault.getLock(key);
  lock.runwithlock(function() {
    Operations.getValue({key: options.key, callback: function(err, value) {
      options.update({value: value, callback: function() {
        // Put the new value to the key
        var rows = [];
        rows.push({type: 'put', key: key, value: value});
        tree.meta.batch(rows, function() {
          lock.release();
        });
      }});
    }});
  });
};

// options: key, field, recursive, callback
Operations.increment = function(options) {
  options.increment = 1;
  Operations.add(options);
};

// options: key, field, recursive, callback
Operations.decrement = function(options) {
  options.increment = -1;
  Operations.add(options);
};

// options: key, field, increment, recursive, callback
Operations.add = function(options) {
  // Lock
  Operations.updateValue({key: options.key, update: function(updateOptions) {
    // Add to the value
    updateOptions.value[options.field] += options.increment;
    updateOptions.callback(updateOptions.value);
  }});
  // Release lock
};
