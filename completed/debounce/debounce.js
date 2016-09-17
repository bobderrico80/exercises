function debounce(callback, threshold) {
  'use strict';

  // closure variable to keep track of the state of the timer.
  var timer;

  // returns the debounced function
  return function() {
    // get reference to function's `this` context.
    var self = this;

    // convert any passed in arguments to an array
    var args = Array.prototype.slice.call(arguments);

    // if there is already a timer running, clear it so we can set a new one.
    if (timer) {
      clearTimeout(timer);
    }

    // set a timeout to call the callback after the threshold.
    timer = setTimeout(function() {
      // call the callback with correct context.
      callback.apply(self, args);
      // reset the timer after calling the callback to allow the callback to
      // run again after the threshold.
      timer = undefined;
    }, threshold);
  };
}

module.exports = debounce;
