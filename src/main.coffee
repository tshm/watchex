'use strict'

fs = require('fs')
exec = require('child_process').exec
runcmd = (cmd) ->
  exec cmd, (err, stdout, stderr) ->
    process.stdout.write stdout
    if stderr
      process.stderr.write stderr
    if err
      console.error err

if process.argv.length < 3
  process.stderr.write 'Usage: watchex command [file ...]'
  process.exit(1)

cmd = process.argv[ 2 ]
files = process.argv.slice( 3 )
if files.length == 0
  files = ['./']
dead = false
undead = () ->
  dead = false

files.forEach ( file ) ->
  fs.watch file, ( event, filename ) ->
    if dead
      return
    runcmd cmd
    dead = true
    setTimeout undead , 1000

process.stdin.resume()
process.stdin.on 'data', () ->
  process.exit()
