'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    main: {
      src: 'src/main/jsx'
    },
    test: {
      src: 'src/test/js'
    },
    react:{
      options: {
        harmony: true
      },
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= main.src %>',
            src: ['**/*.jsx'],
            dest: 'build',
            ext: '.js'
          }
        ]
      }
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
        src: ['build/**/*.js']
      },
      test: {
        src: ['<%= test.src %>/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'build']
      },
      main: {
        files: '<%= main.src %>/**/*.jsx',
        tasks: ['jshint:main', 'build', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');

  // Default task.
  grunt.registerTask('build', ['react']);
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
