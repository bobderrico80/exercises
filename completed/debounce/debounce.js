function debounce(callback, threshold) {
  'use strict';

  // closure variable to keep track of the state of the timer.
  var timer;

  // returns the debounced function
  return function() {
    // get reference to function's `this` context.
    var self = this;

    // if there currently is not a timer running...
    if (!timer) {
      // wait for the threshold to pass, then execute the callback
      timer = setTimeout(function() {
        // call the callback with correct context.
        callback.call(self);
        // reset the timer after calling the callback to allow the callback to
        // run again after the threshold.
        timer = undefined;
      }, threshold);
    }
  };

}

module.exports = debounce;
