var controller = module.exports = {};

controller.onPut = function(key) {
  // Don't create new post metadata for the key
  // Call incrementPostCount(parentKey);
};

controller.onDel = function(key) {
  // Don't create new post metadata for the key
  // Call decrementPostCount(parentKey);
};
