function update(state, changes) {
  'use strict';

  var nextState = {};

  nextState = iterateRecursively(state, changes);
  return nextState;

}

function iterateRecursively(object, changes) {
  var newState = {};

  // confirm that we have an object, if so, we need iterate over its properties
  if (object instanceof Object) {
    for (var property in object) {
      // check to make sure we are not operating on prototype properties
      if (object.hasOwnProperty(property)) {
        if (changes[property] instanceof Object && changes[property].hasOwnProperty('$set')) {
          // We have a change to make! Get the value of $set & assign to the new state.
          newState[property] = changes[property].$set;
          return newState;
        }
        // assign the property to the copy by calling the function recursively
        newState[property] = iterateRecursively(object[property], changes[property]);
      }
    }
    return newState;
  }
  // not an object, just return it.
  return object;
}

module.exports = update;
