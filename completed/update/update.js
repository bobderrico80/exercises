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
    changes.$push.forEach(function(item) {
      nextState.push(item);
    });
    return nextState;
  }

  // check for $unshift command
  if (changes.hasOwnProperty('$unshift')) {
    // iterate through the array of changes and unshift into the next state.
    changes.$unshift.forEach(function(item) {
      nextState.unshift(item);
    });
    return nextState;
  }

  // check for $splice command
  if (changes.hasOwnProperty('$splice')) {
    // iterate through the array of splice arguments.
    changes.$splice.forEach(function(splice_args) {
      // call splice on next state with the args
      nextState.splice.apply(nextState, splice_args);
    });
    return nextState;
  }

  // check for $merge command
  if (changes.hasOwnProperty('$merge')) {
    // use assign helper function to copy the contents of the changes into the current.
    return assign(nextState, changes.$merge);
  }

  // check for $apply command
  if (changes.hasOwnProperty('$apply')) {
    // call the function at $apply, passing it the current state, and return the results;
    return changes.$apply(nextState);
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
    return assign({}, object);
  }
  // otherwise, just return it.
  return object;
}

// Helper function to do the work of copying the object
function assign(target, source) {

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
