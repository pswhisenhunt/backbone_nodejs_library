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
  
  grunt.registerTask('default', ['browserify', 'sass', 'watch']);

}
