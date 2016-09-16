function update(state, changes) {
  'use strict';
  
  var nextState = {};
  
  console.log('state', state);
  nextState = iterateRecursively(state, changes);
  console.log('nextState', nextState);
  
}

function iterateRecursively(object, changes) {
  var newState = {};
  
  // confirm that we have an object, if so, we need iterate over its properties
  if (object instanceof Object) {
    for (var property in object) {
      // check to make sure we are not operating on prototype properties
      if (object.hasOwnProperty(property)) {
        console.log('changes:', changes[property]);
        if (changes[property] instanceof Object && changes[property].hasOwnProperty('$set')) {
          console.log('We have a change to make!', changes[property].$set);
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