var controller = module.exports = {};

controller.onPut = function(key) {
  // Don't create new post metadata for the key
  // Call incrementPostCount(parentKey);
};

controller.onDel = function(key) {
  // Don't create new post metadata for the key
  // Call decrementPostCount(parentKey);
};

controller.incrementPostCount = function(key) {
  // Lock
  // Get postCount for key
  // Add 1 to the post Count
  // Put the postCount to the key
  // Release
  // Call incrementPostCount(parentKey);
};

controller.decrementPostCount = function(key) {
  // Lock
  // Get postCount for key
  // Subtract 1 to the post Count
  // Put the postCount to the key
  // Release
  // Call decrementPostCount(parentKey);
};
