'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    traceur:{
      options: {
        // traceur options here
      },
      commonjs: {
        options: {
          modules: 'commonjs',
          dir: {
            indir: 'lib',
            outdir: 'build/commonjs'
          }
        }
      },
      amd: {
        options: {
          modules: 'amd',
          dir: {
            indir: 'lib',
            outdir: 'build/amd'
          }
        }
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
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
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'build']
      },
      main: {
        files: '<%= jshint.main.src %>',
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
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('build', ['traceur']);
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
