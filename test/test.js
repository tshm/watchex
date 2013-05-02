/*global describe, it */
(function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');
  var spawn = require('child_process').spawn;
  var assert = require('assert');
  var pkg = require('../package.json');
  var eol = require('os').EOL;

  var watchex = path.join(__dirname, '../', pkg.bin.watchex);
  var testcmd = path.join(__dirname, '../test/testcmd');

  describe('bin', function () {

    it('should show usage message if no command given.', function (cb) {
      var bin = spawn('node', [watchex]);

      bin.stderr.setEncoding('utf8');
      bin.stderr.on('data', function(data) {
        assert( /Usage/.test(data) );
        cb();
      });
    });

    it('should exit with code 1 if no command given.', function (cb) {
      var bin = spawn('node', [watchex]);
      bin.on('exit', function (code) {
        assert.equal(code, 1);
        cb();
      });
    });

    it('should exit with code 0 if user push "enter".', function (cb) {
      var bin = spawn('node', [watchex, 'command']);
      bin.on('exit', function (code) {
        assert.equal(code, 0);
        cb();
      });
      setTimeout(function() {
        bin.stdin.write('aa');
      }, 100);
    });

    it('should run command if file changes.', function (cb) {
      var bin = spawn('node', [watchex, 'echo xxx']);
      bin.stderr.setEncoding('utf8');
      bin.stderr.on('data', function(data) {
        assert.fail();
        cb();
      });
      bin.stdout.setEncoding('utf8');
      bin.stdout.on('data', function(data) {
        assert( /xxx/.test(data) );
        cb();
      });
      setTimeout(function() {
        fs.utimesSync('.gitignore', (new Date()), (new Date()));
      }, 100);
    });

  });

})();
