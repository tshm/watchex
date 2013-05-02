(function() {
  'use strict';
  var cmd, dead, exec, files, fs, runcmd, undead;

  fs = require('fs');

  exec = require('child_process').exec;

  runcmd = function(cmd) {
    return exec(cmd, function(err, stdout, stderr) {
      process.stdout.write(stdout);
      if (stderr) {
        process.stderr.write(stderr);
      }
      if (err) {
        return console.error(err);
      }
    });
  };

  if (process.argv.length < 3) {
    process.stderr.write('Usage: watchex command [file ...]');
    process.exit(1);
  }

  cmd = process.argv[2];

  files = process.argv.slice(3);

  if (files.length === 0) {
    files = ['./'];
  }

  dead = false;

  undead = function() {
    return dead = false;
  };

  files.forEach(function(file) {
    return fs.watch(file, function(event, filename) {
      if (dead) {
        return;
      }
      runcmd(cmd);
      dead = true;
      return setTimeout(undead, 1000);
    });
  });

  process.stdin.resume();

  process.stdin.on('data', function() {
    return process.exit();
  });

}).call(this);

/*
//@ sourceMappingURL=main.js.map
*/