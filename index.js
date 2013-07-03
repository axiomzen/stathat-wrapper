var stathat = require('stathat'),
    environment = process.env.NODE_ENV || 'development',
    reporting = true,
    prefix = "",
    separator = " - ";

module.exports = function(key, opts) {
  opts = opts || {};
  environment = ("environment" in opts) ? opts.environment : environment;
  reporting = ("reporting" in opts) ? opts.reporting : reporting;
  separator = ("separator" in opts) ? opts.separator : separator;
  prefix = opts.prefix || prefix;

  var join = function(stat) {
    [prefix, stat].join(separator);
  };

  if (prefix) {
    prefix = [prefix, environment].join(separator);
  } else if (environment) {
    prefix = environment;
  } else {
    // We have no prefix
    join = function(stat) {
      return stat;
    };  
  }

  return {
    count: function(stat, count, cb) {
      if (reporting) {
        stathat.trackEZCount(key, join(stat), count, (cb || function() {}));
      }
    },
    value: function(stat, value, cb) {
      if (reporting) {
        stathat.trackEZValue(key, join(stat), value, (cb || function() {}));
      }
    }
  }
}

module.exports.stathat = stathat;
