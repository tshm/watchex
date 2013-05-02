
NAME
----

`watchex` -- watch files or folder and run a command when files change.

SYNOPSIS
--------

  watchex command [FILE]...

DESCRIPTION
-----------

`watchex` will run a given `command` when given file(s) or folder(s) changes.
If FILE is not given, then it will watch current folder.
Key input `Enter` will terminate the command.

EXAMPLES
--------

This will run 'grunt build' if any file change under the current folder.

  watchex 'grunt build'


This will run 'make test' when `lib/src.js` or `spec/src_spec.js` changes.

  watchex 'make test' lib/src.js spec/src_spec.js

