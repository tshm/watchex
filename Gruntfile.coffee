module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    watch:
      lib:
        files: ['src/*.coffee']
        tasks: ['coffee:lib']

    coffee:
      lib:
        options:
          sourceMap: true
        expand: true
        cwd: 'src/'
        src: ['*.coffee']
        dest: 'lib/'
        ext: '.js'

  grunt.registerTask "default", ['coffee:lib']

