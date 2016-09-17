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

  console.log(getSequenceForCharacter('s'));

  // Helper function to get sequence for one character
  function getSequenceForCharacter(char) {
    // gets code for character an converts to an array of dots and dashes.
    var code = codes[char].split('');

    // parse the code for one character
    var sequence = code.reduce(function(sequence, signal) {
      // push a DASH or DOT into the sequence, depending on it '-' or '.'
      sequence.push(signal === '-' ? DASH : DOT);
      // push a signal buffer in after the sequence.
      sequence.push(SIGNAL_BUFFER);
      return sequence;
    }, []);

    // push a character buffer in at the end of the character
    sequence.push(CHARACTER_BUFFER);
    return sequence;
  }

}



module.exports = transmitter;
