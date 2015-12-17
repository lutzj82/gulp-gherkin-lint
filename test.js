'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var gherkinlint = require('./');

it('should pass when valid gherkin is presented', function (cb) {
  var stream = gherkinlint();

  stream.on('data', function (file) {
    assert.ok(file !== null);
    assert.equal(file.basename, 'file.feature');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '\\file.feature',
    contents: new Buffer('Feature: Core: Scenarios, Steps, Mappings\n\nScenario: All steps passing means the scenario passes\nGiven the step "I add 4 and 5" has a passing mapping\n')
  }));

  stream.end();
});

it('should find issue when invalid character in file', function (cb) {

  var stream = gherkinlint();
  var found = false;

  stream.on('end', function () {
    assert.equal(found, true, 'Should have errored out');
    cb();
  });
  
  stream.on('data', function() {
    
  });
  
  stream.on('error', function (err) {
    found = true;
  });

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '\\file.feature',
    contents: new Buffer('@Feature: Core: Scenarios, Steps, Mappings\n\nScenario: All steps passing means the scenario passes\nGiven the step "I add 4 and 5" has a passing mapping\n')
  }));

  stream.end();

});