'use strict';

module.exports = (grunt) => {

  grunt.initConfig({

    // read package.json file into grunt (for package specific configs)
    pkg: grunt.file.readJSON('package.json')

    // plugin init options here ..
  });

  grunt.registerTask('default', []);
};
