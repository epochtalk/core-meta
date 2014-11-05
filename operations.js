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
  var q = {gt: options.key.concat(null), lt: options.key.concat(undefined), limit: 1};
  var value = null;
  tree.roots.createReadStream(q).on('data', function(ch) {
    // Get the original value
    value = ch.value;
  }).on('end', function() {
    options.callback(value);
  });
};

Operations.updateValue = function(options) {
  var q = {gt: options.key.concat(null), lt: options.key.concat(undefined), limit: 1};
  var value = null;
  tree.roots.createReadStream(q).on('data', function(ch) {
    // Get the original value
    value = ch.value;
  }).on('end', function() {
    // Update the value
    options.update({value: value, callback: function(){
      // Put the new value to the key
      var rows = [];
      rows.push({type: 'put', key: key, value: value});
      self.tree.meta.batch(rows, function() {
        // Recurse if necessary
        if (options.recursive) {
          // Get parentKey
          Operations.getParentKey({key: key, callback: function(parentKey) {
            // Recurse
            if (parentKey) {
              options.key = parentKey;
              Operations.add(options);
            }
          }});
        }
      });
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
