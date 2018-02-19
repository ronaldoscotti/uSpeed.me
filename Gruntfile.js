// Invoke 'strict' JavaScript mode
'use strict';

module.exports = function(grunt) {
   grunt.initConfig({
      env: {
         dev: {
            NODE_ENV: 'development'
         },
         test: {
            NODE_ENV: 'test'
         }
      },
      nodemon: {
         dev: {
            script: 'server.js',
            options: {
               ext: 'js,html',
               watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
            }
         }
      },
      mochaTest: {
         src: 'app/tests/**/*.js',
         options: {
            reporter: 'spec'
         }
      },
      karma: {
         unit: {
            configFile: 'karma.conf.js'
         }
      },
      csslint: {
         all: {
            src: 'public/assets/css/*.css'
         }
      }
   });

   grunt.loadNpmTasks('grunt-env');
   grunt.loadNpmTasks('grunt-nodemon');
   grunt.loadNpmTasks('grunt-mocha-test');
   grunt.loadNpmTasks('grunt-karma');
   grunt.loadNpmTasks('grunt-contrib-csslint');

   grunt.registerTask('default', ['env:dev', 'nodemon']);
   grunt.registerTask('test', ['env:test', 'mochaTest', 'karma']);
   grunt.registerTask('lint', ['csslint']);
};
