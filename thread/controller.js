var controller = module.exports = {};

// On put/del
controller.onPut = function(key) {
  // Initialize new metadata for the key from model
};
controller.onDel = function(key) {
  // Delete the thread metadata for the key
};

// Calculation methods may not be necessary
// if re-running all updates on start
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
