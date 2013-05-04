module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-coffeelint'

  grunt.initConfig
    watch:
      lib:
        files: ['src/*.coffee']
        tasks: ['default']

    coffeelint:
      lib: ['src/*.coffee']

    coffee:
      lib:
        options:
          sourceMap: true
        expand: true
        cwd: 'src/'
        src: ['*.coffee']
        dest: 'lib/'
        ext: '.js'

  grunt.registerTask "default", [
    'coffeelint'
    'coffee:lib'
    'test'
  ]

  grunt.registerTask 'test', 'run mocha', () ->
    done = this.async()
    require('child_process').exec 'mocha ./test/test.js', (err, stdout) ->
      grunt.log.write stdout
      done err
