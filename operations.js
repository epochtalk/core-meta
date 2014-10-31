var Operations = module.exports = {};

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
  // Get current value for key.field
  // Add to the value
  value += options.increment;
  // Put the new value to the key
  // Recurse if necessary
  if (options.recursive) {
    // Get parentKey
    // Recurse
    options.key = parentKey;
    Operations.increment(options);
  }
  // Release lock
};
