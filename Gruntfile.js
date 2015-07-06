module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'public/bundle.js': ['client/assets/js/*', '!server/app.js', '!routes/*', '!spec/*']
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
        files: ['assets/**/*'],
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
