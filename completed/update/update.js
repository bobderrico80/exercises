/**
 * I'll be honest and admit that I got stuck on making this work, and "cheated"
 * by looking at React's source code for this function to see how they did it.
 * While I was not able to work it out on my own, I did learn a lot in the process.
 */

function update(state, changes) {
  'use strict';
  console.log('state:', state);
  console.log('changes:', changes);

  // check for the $set command
  if (changes.hasOwnProperty('$set')) {
    // if so, return the value of the change
    return changes.$set;
  }

  // make a copy of the current state
  var nextState = shallowCopy(state);

  // check for the $push command
  if (changes.hasOwnProperty('$push')) {
    // iterate through the array of changes and push into the next state
    changes.$push.forEach(function (item) {
      nextState.push(item);
    });
    return nextState;
  }

  // check changes to see if there is another level of changes to be made.
  for (var key in changes) {
    // for each level of changes found, call update recursively with the next
    // level's state and changes.
    nextState[key] = update(state[key], changes[key]);
  }
  return nextState;
}

// Helper function to make a shallow copy of an object
function shallowCopy(object) {
  // if it's an array, return a copy of it.
  if (Array.isArray(object)) {
    return object.concat();
  }
  // if it's an object, make the copy.
  if (object && typeof object === 'object') {
    return assign(object);
  }
  // otherwise, just return it.
  return object;
}

// Helper function to do the work of copying the object
function assign(source) {
  var target = {};

  // iterate over object properties
  for (var key in source) {
    // check to make sure we aren't accessing a property on the prototype.
    if (source.hasOwnProperty(key)) {
      // assign the source value to the target value;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = update;
