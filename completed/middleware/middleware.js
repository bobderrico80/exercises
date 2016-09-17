var Middleware = function(){};

// array to store the middleware functions.
var toProcess = [];

// value to store the final callback
var finalCallback;

Middleware.prototype.use = function(middleware) {
  // push middleware function into the stack
  toProcess.push(middleware);
};

Middleware.prototype.go = function(callback) {
  // save the final callback value
  finalCallback = callback;
  // process the middleware
  processMiddleware();
};

function processMiddleware() {
  // there is middleware to proces...
  if (toProcess.length > 0) {
    // shift middleware off the beginning of array, and call it, passing it this function.
    toProcess.shift()(processMiddleware);
  } else {
    // if there is no more middleware, call the final callback.
    finalCallback();
  }
}

module.exports = Middleware;
