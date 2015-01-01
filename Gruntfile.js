'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    main: {
      src: 'src'
    },
    test: {
      src: 'test'
    },
    example: {
      src: 'example'
    },
    nodeunit: {
      files: ['<%= test.src %>/**/*_test.js']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      main: {
        src: ['<%= main.src %>/**/*.js']
      },
      test: {
        src: ['<%= test.src %>/**/*.js']
      },
      example: {
        options: {
          jshintrc: './example/.jshintrc'
        },
        src: ['<%= example.src %>/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'default']
      },
      main: {
        files: '<%= jshint.main.src %>',
        tasks: ['jshint:main', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
      example: {
        files: '<%= jshint.example.src %>',
        tasks: ['jshint:example', 'nodeunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
