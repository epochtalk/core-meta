var controller = module.exports = {};

// On put/del
controller.onPut = function(key) {
  // Create new thread metadata for the key
};
controller.onDel = function(key) {
  // Delete the thread metadata for the key
};

controller.calculateFirstPost = function(key) {
  // Get one element (use index)
};

controller.calculateLastPost = function(key) {
  // Get one element, reverse order (use index)
};

controller.calculatePostCount = function(key) {
  // Lock
  // Get children posts for key
  // Put the postCount to the key
  // Release
};

controller.get = function(key) {
  // return metadata for key
};
