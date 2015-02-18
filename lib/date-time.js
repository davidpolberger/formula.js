var error = require('./error');
var utils = require('../utils');

var WEEK_STARTS = [
  undefined,
  0,
  1,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  1,
  2,
  3,
  4,
  5,
  6,
  0
];
var WEEK_TYPES = [
  [],
  [1, 2, 3, 4, 5, 6, 7],
  [7, 1, 2, 3, 4, 5, 6],
  [6, 0, 1, 2, 3, 4, 5],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [7, 1, 2, 3, 4, 5, 6],
  [6, 7, 1, 2, 3, 4, 5],
  [5, 6, 7, 1, 2, 3, 4],
  [4, 5, 6, 7, 1, 2, 3],
  [3, 4, 5, 6, 7, 1, 2],
  [2, 3, 4, 5, 6, 7, 1],
  [1, 2, 3, 4, 5, 6, 7]
];
var WEEKEND_TYPES = [
  [],
  [6, 0],
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  undefined,
  undefined,
  undefined, [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6]
];

exports.DATE = function(year, month, day) {
  year = utils.parseNumber(year);
  if (year instanceof Error) {
    return year;
  }
  month = utils.parseNumber(month);
  if (month instanceof Error) {
    return month;
  }
  day = utils.parseNumber(day);
  if (day instanceof Error) {
    return day;
  }
  if (year < 0 || month < 0 || day < 0) {
    return error.num;
  }
  var date = Date.UTC(year, month - 1, day);
  return utils.jsToExcelTimestamp(date);
};

exports.DATEVALUE = function(date_text) {
  if (typeof date_text !== 'string') {
    return error.value;
  }
  var date = utils.parseDate(date_text);
  if (date instanceof Error) {
    return date;
  }
  return utils.jsToExcelTimestamp(date);
};

exports.DAY = function(serial_number) {
  var date = utils.parseDate(serial_number);
  if (date instanceof Error) {
    return date;
  }
  return date.getUTCDate();
};

exports.DAYS = function(end_date, start_date) {
  end_date = utils.parseDate(end_date);
  if (end_date instanceof Error) {
    return end_date;
  }
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  return utils.jsToExcelTimestamp(end_date) - utils.jsToExcelTimestamp(start_date);
};

exports.DAYS360 = function(start_date, end_date, method) {
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  end_date = utils.parseDate(end_date);
  if (end_date instanceof Error) {
    return end_date;
  }
  method = utils.parseBool(method);
  if (method instanceof Error) {
    return method;
  }
  var sm = start_date.getUTCMonth();
  var em = end_date.getUTCMonth();
  var sd, ed;
  if (method) {
    sd = start_date.getUTCDate() === 31 ? 30 : start_date.getUTCDate();
    ed = end_date.getUTCDate() === 31 ? 30 : end_date.getUTCDate();
  } else {
    var smd = new Date(start_date.getUTCFullYear(), sm + 1, 0).getUTCDate();
    var emd = new Date(end_date.getUTCFullYear(), em + 1, 0).getUTCDate();
    sd = start_date.getUTCDate() === smd ? 30 : start_date.getUTCDate();
    if (end_date.getUTCDate() == emd) {
      if (sd < 30) {
        em++;
        ed = 1;
      } else {
        ed = 30;
      }
    } else {
      ed = end_date.getUTCDate();
    }
  }
  return 360 * (end_date.getUTCFullYear() - start_date.getUTCFullYear()) +
    30 * (em - sm) + (ed - sd);
};

exports.EDATE = function(start_date, months) {
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  if (isNaN(months)) {
    return error.value;
  }
  months = parseInt(months, 10);
  start_date.setUTCMonth(start_date.getUTCMonth() + months);
  return utils.jsToExcelTimestamp(start_date);
};

exports.EOMONTH = function(start_date, months) {
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  if (isNaN(months)) {
    return error.value;
  }
  months = parseInt(months, 10);
  return utils.jsToExcelTimestamp(new Date(start_date.getUTCFullYear(), start_date.getUTCMonth() + months + 1, 0));
};

exports.HOUR = function(serial_number) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  return serial_number.getUTCHours();
};

exports.ISOWEEKNUM = function(date) {
  date = utils.parseDate(date);
  if (date instanceof Error) {
    return date;
  }

  date.setUTCHours(0, 0, 0);
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  var yearStart = new Date(date.getUTCFullYear(), 0, 1);
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
};

exports.MINUTE = function(serial_number) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  return serial_number.getUTCMinutes();
};

exports.MONTH = function(serial_number) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  return serial_number.getUTCMonth() + 1;
};

exports.NETWORKDAYS = function(start_date, end_date, holidays) {
  return exports.NETWORKDAYS.INTL(start_date, end_date, 1, holidays);
};

exports.NETWORKDAYS.INTL = function(start_date, end_date, weekend, holidays) {
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  end_date = utils.parseDate(end_date);
  if (end_date instanceof Error) {
    return end_date;
  }
  if (weekend === undefined) {
    weekend = WEEKEND_TYPES[1];
  } else {
    weekend = WEEKEND_TYPES[weekend];
  }
  if (!(weekend instanceof Array)) {
    return error.value;
  }
  if (holidays === undefined) {
    holidays = [];
  } else if (!(holidays instanceof Array)) {
    holidays = [holidays];
  }
  for (var i = 0; i < holidays.length; i++) {
    var h = utils.parseDate(holidays[i]);
    if (h instanceof Error) {
      return h;
    }
    holidays[i] = h;
  }
  var days = (end_date - start_date) / (1000 * 60 * 60 * 24);
  var total = days;
  var day = start_date;
  for (i = 0; i < days; i++) {
    var d = day.getUTCDay();
    var dec = false;
    if (d === weekend[0] || d === weekend[1]) {
      dec = true;
    }
    for (var j = 0; j < holidays.length; j++) {
      var holiday = holidays[j];
      if (holiday.getUTCDate() == day.getUTCDate() &&
        holiday.getUTCMonth() == day.getUTCMonth() &&
        holiday.getUTCFullYear() == day.getUTCFullYear()) {
        dec = true;
        break;
      }
    }
    if (dec) {
      total--;
    }
    day.setUTCDate(day.getUTCDate() + 1);
  }
  return total;
};

exports.NOW = function() {
  return utils.jsToExcelTimestamp(new Date());
};

exports.SECOND = function(serial_number) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  return serial_number.getUTCSeconds();
};

exports.TIME = function(hour, minute, second) {
  hour = utils.parseNumber(hour);
  if (hour instanceof Error) {
    return hour;
  }
  minute = utils.parseNumber(minute);
  if (minute instanceof Error) {
    return minute;
  }
  second = utils.parseNumber(second);
  if (second instanceof Error) {
    return second;
  }
  if (hour < 0 || minute < 0 || second < 0) {
    return error.num;
  }
  return (3600 * hour + 60 * minute + second) / 86400;
};

exports.TIMEVALUE = function(time_text) {
  time_text = utils.parseDate(time_text);
  if (time_text instanceof Error) {
    return time_text;
  }
  return (3600 * time_text.getUTCHours() +
    60 * time_text.getUTCMinutes() +
    time_text.getUTCSeconds()) / 86400;
};

exports.TODAY = function() {
  var date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return utils.jsToExcelTimestamp(date);
};

exports.WEEKDAY = function(serial_number, return_type) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  if (return_type === undefined) {
    return_type = 1;
  }
  var day = serial_number.getUTCDay();
  return WEEK_TYPES[return_type][day];
};

exports.WEEKNUM = function(serial_number, return_type) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  if (return_type === undefined) {
    return_type = 1;
  }
  if (return_type === 21) {
    return exports.ISOWEEKNUM(serial_number);
  }
  var week_start = WEEK_STARTS[return_type];
  var jan = new Date(serial_number.getUTCFullYear(), 0, 1);
  var inc = jan.getUTCDay() < week_start ? 1 : 0;
  jan -= Math.abs(jan.getUTCDay() - week_start) * 24 * 60 * 60 * 1000;
  return Math.floor(((serial_number - jan) / (1000 * 60 * 60 * 24)) / 7 + 1) + inc;
};

exports.WORKDAY = function(start_date, days, holidays) {
  return exports.WORKDAY.INTL(start_date, days, 1, holidays);
};

exports.WORKDAY.INTL = function(start_date, days, weekend, holidays) {
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  days = utils.parseNumber(days);
  if (days instanceof Error) {
    return days;
  }
  if (days < 0) {
    return error.num;
  }
  if (weekend === undefined) {
    weekend = WEEKEND_TYPES[1];
  } else {
    weekend = WEEKEND_TYPES[weekend];
  }
  if (!(weekend instanceof Array)) {
    return error.value;
  }
  if (holidays === undefined) {
    holidays = [];
  } else if (!(holidays instanceof Array)) {
    holidays = [holidays];
  }
  for (var i = 0; i < holidays.length; i++) {
    var h = utils.parseDate(holidays[i]);
    if (h instanceof Error) {
      return h;
    }
    holidays[i] = h;
  }
  var d = 0;
  while (d < days) {
    start_date.setDate(start_date.getUTCDate() + 1);
    var day = start_date.getUTCDay();
    var inc = true;
    if (day === weekend[0] || day === weekend[1]) {
      continue;
    }
    for (var j = 0; j < holidays.length; j++) {
      var holiday = holidays[j];
      if (holiday.getUTCDate() == start_date.getUTCDate() &&
        holiday.getUTCMonth() == start_date.getUTCMonth() &&
        holiday.getUTCFullYear() == start_date.getUTCFullYear()) {
        d--;
        break;
      }
    }
    d++;
  }
  return utils.jsToExcelTimestamp(start_date);
};

exports.YEAR = function(serial_number) {
  serial_number = utils.parseDate(serial_number);
  if (serial_number instanceof Error) {
    return serial_number;
  }
  return serial_number.getUTCFullYear();
};

exports.YEARFRAC = function(start_date, end_date, basis) {
  start_date = utils.parseDate(start_date);
  if (start_date instanceof Error) {
    return start_date;
  }
  end_date = utils.parseDate(end_date);
  if (end_date instanceof Error) {
    return end_date;
  }
  if (basis === undefined) {
    basis = 0;
  }
  var sd = start_date.getUTCDate();
  var sm = start_date.getUTCMonth() + 1;
  var sy = start_date.getUTCFullYear();
  var ed = end_date.getUTCDate();
  var em = end_date.getUTCMonth() + 1;
  var ey = end_date.getUTCFullYear();

  switch (basis) {
    case 0:
      if (sd === 31 && ed === 31) {
        sd = 30;
        ed = 30;
      } else if (sd === 31) {
        sd = 30;
      } else if (sd === 30 && ed === 31) {
        ed = 30;
      }
      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
    case 1:
      var feb29Between = function(date1, date2) {
        var mar1year1 = new Date(date1.getUTCFullYear(), 2, 1);
        if (new Date(date1.getUTCFullYear(), 1, 29).getUTCMonth() == 1 && date1 - mar1year1 < 0 && date2 - mar1year1 >= 0) {
          return true;
        }
        var mar1year2 = new Date(date2.getUTCFullYear(), 2, 1);
        if (new Date(date2.getUTCFullYear(), 1, 29).getUTCMonth() == 1 && date2 - mar1year2 >= 0 && date1 - mar1year2 < 0) {
          return true;
        }
        return false;
      };
      var ylength = 365;
      if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
        if (sy === ey && new Date(sy, 1, 29).getUTCMonth() == 1) {
          ylength = 366;
        } else if (feb29Between(start_date, end_date) || (em === 1 && ed === 29)) {
          ylength = 366;
        }
        return (end_date - start_date) / 1000 / 60 / 60 / 24 / ylength;
      }
      var years = (ey - sy) + 1;
      var days = (new Date(ey + 1, 0, 1) - new Date(sy, 0, 1)) / 1000 / 60 / 60 / 24;
      var average = days / years;
      return (end_date - start_date) / 1000 / 60 / 60 / 24 / average;
    case 2:
      return (end_date - start_date) / 1000 / 60 / 60 / 24 / 360;
    case 3:
      return (end_date - start_date) / 1000 / 60 / 60 / 24 / 365;
    case 4:
      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
  }
};
