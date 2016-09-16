function update(state, changes) {
  'use strict';
  
  console.log(state);
  var nextState = {};

  iterateRecursively(state, function(value) {
    console.log(value);
  });
  
}

function iterateRecursively(object, callback) {
  for (var property in object) {
    // checking to make sure we are not iterating over properties further up 
    // in the prototype chain
    if (object.hasOwnProperty(property)) {
      // there is a child object: call this function recursively
      // otherwise, run the callback function
      if (typeof object[property] === 'object') {
        iterateRecursively(object[property], callback);
      } else {
        callback(object[property]);
      } 
    }
  }
}

module.exports = update;