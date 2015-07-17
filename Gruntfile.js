module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'public/bundle-index.js': ['client/assets/js/index.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/main.css': 'client/assets/scss/main.scss'
        }
      }
    },
    // jasmine: {
    //   src: 'assets/js/*',
    //   specs: 'spec/spec.js'
    // },
    watch: {
      scripts: {
        files: ['client/assets/**/*'],
        tasks: ['browserify', 'sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-jasmine-runner');

  grunt.registerTask('default', ['browserify', 'sass', 'watch']);

}
