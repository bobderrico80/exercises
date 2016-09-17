function debounce(callback, threshold) {
  'use strict';

  // returns the debounced function
  return function() {
    // when called, wait for the threshold to pass, then execute the callback
    setTimeout(callback, threshold);
  };

}

module.exports = debounce;
