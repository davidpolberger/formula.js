var utils = require('../utils');
var error = require('./error');
var numeral = require('numeral');
var _ = require('../utils/limited-lodash');

//TODO
exports.ASC = function() {
 throw new Error('ASC is not implemented');
};

//TODO
exports.BAHTTEXT = function() {
 throw new Error('BAHTTEXT is not implemented');
};

exports.CHAR = function(number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number < 1 || number > 255) {
    return error.value;
  }
  return String.fromCharCode(number);
};

exports.CLEAN = function(text) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  return text.replace(/[\0-\x1F]/g, "");
};

exports.CODE = function(text) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  return text.charCodeAt(0);
};

exports.CONCATENATE = function() {
  var args = _.flatten(arguments);

  for (var i = 0; i < args.length; i++) {
    var text = utils.parseText(args[i]);
    if (text instanceof Error) {
      return text;
    }
    args[i] = text;
  }

  return args.join('');
};

//TODO
exports.DBCS = function() {
 throw new Error('DBCS is not implemented');
};

exports.DOLLAR = function(number, decimals) {
  decimals = (decimals === undefined) ? 2 : decimals;

  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  decimals = utils.parseNumber(decimals);
  if (decimals instanceof Error) {
    return decimals;
  }
  var format = '';
  if (decimals <= 0) {
    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    format = '($0,0)';
  } else if (decimals > 0) {
    format = '($0,0.' + new Array(decimals + 1).join('0') + ')';
  }
  return numeral(number).format(format);
};

exports.EXACT = function(text1, text2) {
  text1 = utils.parseText(text1);
  if (text1 instanceof Error) {
    return text1;
  }
  text2 = utils.parseText(text2);
  if (text2 instanceof Error) {
    return text2;
  }
  return text1 === text2;
};

exports.FIND = function(find_text, within_text, position) {
  position = (position === undefined) ? 0 : position;

  find_text = utils.parseText(find_text);
  if (find_text instanceof Error) {
    return find_text;
  }
  within_text = utils.parseText(within_text);
  if (within_text instanceof Error) {
    return within_text;
  }
  position = utils.parseNumber(position);
  if (position instanceof Error) {
    return position;
  }
  if (position < 0 || position > within_text.length) {
    return error.value;
  }
  var result = within_text.indexOf(find_text, position - 1) + 1;
  if (result === 0) {
    return error.value;
  }
  return result;
};

exports.FIXED = function(number, decimals, no_commas) {
  decimals = (decimals === undefined) ? 2 : decimals;
  no_commas = (no_commas === undefined) ? false : no_commas;

  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  decimals = utils.parseNumber(decimals);
  if (decimals instanceof Error) {
    return decimals;
  }

  var format = no_commas ? '0' : '0,0';
  if (decimals <= 0) {
    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  } else if (decimals > 0) {
    format += '.' + new Array(decimals + 1).join('0');
  }
  return numeral(number).format(format);
};

exports.LEFT = function(text, number) {
  number = (number === undefined) ? 1 : number;

  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number < 0) {
    return error.value;
  }
  return text.substring(0, number);
};

exports.LEN = function(text) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  return text.length;
};

exports.LOWER = function(text) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  return text.toLowerCase();
};

exports.MID = function(text, start, number) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  start = utils.parseNumber(start);
  if (start instanceof Error) {
    return start;
  }
  if (start < 1) {
    return error.value;
  }
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  if (number < 0) {
    return error.value;
  }
  return text.substring(start - 1, number);
};

// TODO
exports.NUMBERVALUE = function() {
 throw new Error('NUMBERVALUE is not implemented');
};

// TODO
exports.PRONETIC = function() {
 throw new Error('PRONETIC is not implemented');
};

exports.PROPER = function(text) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }

  return text.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.REPLACE = function(text, position, length, new_text) {
  text = utils.parseText(text);
  if (text instanceof Error) {
    return text;
  }
  position = utils.parseNumber(position);
  if (position instanceof Error) {
    return position;
  }
  if (position < 1) {
    return error.value;
  }
  length = utils.parseNumber(length);
  if (length instanceof Error) {
    return length;
  }
  if (length < 0) {
    return error.value;
  }
  new_text = utils.parseText(new_text);
  if (new_text instanceof Error) {
    return new_text;
  }
  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
};

exports.REPT = function(text, number) {
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return new Array(number + 1).join(text);
};

exports.RIGHT = function(text, number) {
  number = (number === undefined) ? 1 : number;
  number = utils.parseNumber(number);
  if (number instanceof Error) {
    return number;
  }
  return text ? text.substring(text.length - number) : null;
};

exports.SEARCH = function(find_text, within_text, position) {
  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
    return error.value;
  }
  position = (position === undefined) ? 0 : position;
  return within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1) + 1;
};


exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
  if (!text || !old_text || !new_text) {
    return text;
  } else if (occurrence === undefined) {
    return text.replace(new RegExp(old_text, 'g'), new_text);
  } else {
    var index = 0;
    var i = 0;
    while (text.indexOf(old_text, index) > 0) {
      index = text.indexOf(old_text, index + 1);
      i++;
      if (i === occurrence) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
      }
    }
  }
};

exports.T = function(value) {
  return (typeof value === "string") ? value : '';
};

// TODO
exports.TEXT = function() {
  throw new Error('TEXT is not implemented');
};

exports.TRIM = function(text) {
  if (typeof text !== 'string') {
    return error.value;
  }
  return text.replace(/ +/g, ' ').trim();
};

exports.UNICHAR = exports.CHAR;

exports.UNICODE = exports.CODE;

exports.UPPER = function(text) {
  if (typeof text !== 'string') {
    return error.value;
  }
  return text.toUpperCase();
};

exports.VALUE = function(text) {
  if (typeof text !== 'string') {
    return error.value;
  }
  return numeral().unformat(text);
};
