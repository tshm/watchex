module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    watch:
      lib:
        files: ['src/*.coffee']
        tasks: ['coffee:lib', 'test']

    coffee:
      lib:
        options:
          sourceMap: true
        expand: true
        cwd: 'src/'
        src: ['*.coffee']
        dest: 'lib/'
        ext: '.js'

  grunt.registerTask "default", ['coffee:lib', 'test']

  grunt.registerTask 'test', 'run mocha', () ->
    done = this.async()
    require('child_process').exec 'mocha ./test/test.js', (err, stdout) ->
      grunt.log.write stdout
      done err
