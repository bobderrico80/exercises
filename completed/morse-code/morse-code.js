function transmitter(options, callback) {
  'use strict';

  // set some constants
  var DOT = 1;
  var DASH = DOT * 3;
  var BUFFER = DOT;
  var LETTER_SPACE = DOT * 3;
  var WORD_SPACE = DOT * 7;

  // set values from options
  var toggle = options.toggle;
  var codes = options.codes;
  var timer = options.timeouter;

  // convert message into an array of characters
  var characters = options.message.split('');

}


module.exports = transmitter;
