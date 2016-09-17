function debounce(callback, threshold) {
  'use strict';

  // closure variable to keep track of the state of the timer.
  var timer;

  // returns the debounced function
  return function() {
    // if there currently is not a timer running...
    if (!timer) {
      // wait for the threshold to pass, then execute the callback
      timer = setTimeout(callback, threshold);
    }
  };

}

module.exports = debounce;
