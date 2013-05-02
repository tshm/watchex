(function() {
  'use strict';

  var fs = require('fs');
  var exec = require('child_process').exec;
  var runcmd = function( cmd ) {
    exec( cmd, function( err, stdout, stderr ) {
      process.stdout.write( stdout );
      if ( stderr ) process.stderr.write( stderr );
      if ( err ) console.error( err );
    });
  };

  if ( process.argv.length < 3 ) {
    console.log('Usage: watcmd command [file ...]');
    return;
  }

  var cmd = process.argv[ 2 ];
  var files = process.argv.slice( 3 );
  if ( files.length === 0) files = ['./'];
  var dead = false;

  files.forEach(function( file ) {
    fs.watch( file, function( event, filename ) {
      if ( dead ) return;
      runcmd( cmd );
      dead = true;
      setTimeout(function() {
        dead = false;
      }, 1000 );
    });
  });

}).call( this );
