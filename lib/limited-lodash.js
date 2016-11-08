exports.flatten = function(array, shallow) {
  return _flatten(array, shallow, false, []);
};

exports.initial = function (array) {
  var length = array ? array.length : 0;
  return slice(array, 0, length ? length - 1 : 0);
};

exports.rest = function (array) {
  return slice(array, 1);
};


function every (obj, predicate, context) {
  if (obj === null) {
    return true;
  }
  predicate = _.iteratee(predicate, context);
  var keys = obj.length !== +obj.length && _.keys(obj);
  var length = (keys || obj).length;
  var index, currentKey;
  for (index = 0; index < length; index++) {
    currentKey = keys ? keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
}

function isArguments (args) {
  return args && args.toString() === '[object Arguments]';
}

var _flatten = function _flatten (input, shallow, strict, output) {
  if (shallow && every(input, Array.isArray)) {
    return concat.apply(output, input);
  }
  for (var i = 0, length = input.length; i < length; i++) {
    var value = input[i];
    if (!Array.isArray(value) && !isArguments(value)) {
      if (!strict) output.push(value);
    } else if (shallow) {
      push.apply(output, value);
    } else {
      _flatten(value, shallow, strict, output);
    }
  }
  return output;
};

function isBoolean (bool) {
  return bool === true || bool === false;
}

exports.uniq = function uniq (array) {
  if (array === null) {
    return [];
  }
  var result = [];
  var seen = [];
  for (var i = 0, length = array.length; i < length; i++) {
    var value = array[i];
    if (result.indexOf(value) < 0) {
      result.push(value);
    }
  }
  return result;
};

function slice(array, start, end) {
  var index = -1;
  var length = array ? array.length : 0;

  start = start === null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  if (end && end == length && !start) {
    return baseSlice(array);
  }
  length = start > end ? 0 : (end - start);

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}