function transmitter(options, callback) {
  'use strict';

  // set some constants
  var DOT = 1;
  var DASH = DOT * 3;
  var SIGNAL_BUFFER = DOT;
  var CHARACTER_BUFFER = DOT * 3;
  var SPACE = DOT * 7;

  // set values from options
  var toggle = options.toggle;
  var codes = options.codes;
  var timer = options.timeouter;

  // convert message into an array of characters
  var characters = options.message.split('');

  // get sequence for the word
  var sequence = getSequenceForWord(characters);

  // push the callback into the sequence.
  sequence.push(callback);

  // run it
  runSequence(sequence);

  // Helper function to get sequence for characters in one word
  function getSequenceForWord(characters) {
    // iterate through characters
    return characters.reduce(function(fullSequence, character, i, characters) {
      // get the character's sequence.
      var characterSequence = getSequenceForCharacter(character);

      // add it to the full sequence so far.
      fullSequence = fullSequence.concat(characterSequence);

      // if we are not on the last character, add a character buffer
      if (i < characters.length - 1) {
        fullSequence.push(CHARACTER_BUFFER);
      }

      return fullSequence;
    }, []);
  }

  // Helper function to get sequence for one character
  function getSequenceForCharacter(char) {
    // gets code for character an converts to an array of dots and dashes.
    var code = codes[char].split('');

    // parse the code for one character
    var sequence = code.reduce(function(sequence, signal, i, arr) {
      // push a DASH or DOT into the sequence, depending on it '-' or '.'
      sequence.push(signal === '-' ? DASH : DOT);
      // push a signal buffer in after the sequence if we are not a the end of the character.
      if (i < arr.length - 1) {
        sequence.push(SIGNAL_BUFFER);
      }
      return sequence;
    }, []);

    return sequence;
  }

  function runSequence(sequence) {

    // toggle on to start;
    toggle();

    // run the rest of the sequence.
    sequence.reduce(function(totalTime, signal) {

      // if we have a function, it is the end-of-sequence callback.
      if (typeof signal === 'function') {
        // set the callback to run with the total elapsed time.
        timer(signal, totalTime);
        return;
      }

      // add the current signal to the elapsed time, and set the timer with the new time.
      signal += totalTime;
      timer(toggle, signal);
      return signal;
    }, 0);
  }

}



module.exports = transmitter;
