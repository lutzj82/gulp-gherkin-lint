'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var gherkin = require('gherkin');
var chalk = require('chalk');

var PLUGIN_NAME = 'gulp-gherkin-lint';

module.exports = function () {

  var parser = new gherkin.Parser();
  var errors = [];

  var stream = through.obj(parse, report);

  function parse(file, encoding, callback) {
    
    if (file.isNull()) {
      return callback(null, file);
    }
    
    if (file.isStream()) {
      return callback(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    
    try {
      parser.parse(file.contents.toString('utf8'));
      stream.push(file);
      return callback();
    } catch (e) {
      var pluginError = chalk.red(e.message) + '\nat: ' + chalk.cyan(file.path);
      errors.push(pluginError);
    }
    return callback();
  }

  function report(callback) {
    if (errors.length > 0) {
      stream.emit('error', new gutil.PluginError(PLUGIN_NAME, {
        message: '\n' + errors.join('\n'),
        showStack: false
      }));
    }
    callback();
  }

  return stream;
};