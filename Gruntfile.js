'use strict';

module.exports = (grunt) => {

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-ng-annotate');
  // grunt.loadNpmTasks('grunt-asset-injector');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    // read package.json file into grunt (for package specific configs)
    pkg: grunt.file.readJSON('package.json'),

    path: {
      temp: '.tmp',
      client: {
        source: 'client',
        dist:   'dist'
      }
    },

    // Empties folders to start fresh
    clean: {
      tmp: [
        '<%= path.temp %>',
        '.sass-cache'
      ],
      tmpSrc: [
        '<%= path.temp %>/src'
      ],
      tmpConcat: [
        '<%= path.temp %>/concat'
      ],
      tmpTpl: [
        '<%= path.temp %>/app.templates.js'
      ],
      tmpCss: [
        '<%= path.temp %>/app.build.css'
      ],
      dist: [
        '<%= path.client.dist %>/*',
        '!<%= path.client.dist %>/.git*'
      ]
    },

    concat: {
      options: {},
      dest: '<%= path.client.dist %>/'
    },

    useminPrepare: {
      html: ['<%= path.client.dist %>/index.html'],
      options: {
        dest: '<%= path.client.dist %>/'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= path.client.dist %>/{,*/}*.html'],
      css: ['<%= path.client.dist %>/{,*/}*.css'],
      js: [ '<%= path.client.dist %>/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= path.client.dist %>',
          '<%= path.client.dist %>/assets'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    wiredep: {
      target: {
        src: '<%= path.client.source %>/index.html',
        ignorePath: '<%= path.client.source %>/',
        exclude: [
          /bootstrap-sass/,
          /bootstrap.js/,
          '/json3/',
          '/es5-shim/',
          /jquery/,
          /bootstrap.css/,
          /font-awesome.css/
        ]
      }
    },

    // Compiles Sass to CSS
    sass: {
      options: {
        sourcemap: 'none',
        style: 'expanded',
        compass: false
      },
      dist: {
        loadPath: [
          '<%= path.client.source %>/vendor',
          //'<%= path.client.source %>'
        ],
        files: {
          '<%= path.temp %>/app.build.css' : '<%= path.client.source %>/src/app.scss'
        }
      }
    },

    // Inject application script files into index.html (doesn't include bower)
    injector: {
      options: {
      },
      scripts: {
        options: {
          transform: function(filePath) {
            grunt.log.ok('injector:js:transform: ' + filePath);
            return '<script src="' + filePath + '"></script>';
          },
          relative: true,
          ignorePath: '<%= path.client.source %>',
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= path.client.source %>/index.html': [
            '{<%= path.temp %>,<%= path.client.source %>}/src/**/*.js',
            '!{<%= path.temp %>,<%= path.client.source %>}/src/**/*.spec.js',
            '!{<%= path.temp %>,<%= path.client.source %>}/src/**/*.mock.js'
          ]
        }
      },

      // Inject component scss into app.scss
      sass: {
        options: {
          transform: function(filePath) {
            grunt.log.ok('injector:sass:transform: ' + filePath);
            return '@import \'' + filePath + '\';';
          },
          relative: true,
          ignorePath: '<%= path.client.source %>/src',
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= path.client.source %>/src/app.scss': [
            '<%= path.client.source %>/src/**/*.{scss,sass}',
            '!<%= path.client.source %>/src/app.{scss,sass}'
          ]
        }
      },

      // inject our app.templates.js file into build js files
      tpl: {
        options: {
          transform: function(filePath) {
            grunt.log.ok('injector:tpl:transform: ' + filePath);
            return '<script src="' + filePath + '"></script>';
          },
          relative: true,
          ignorePath: '../<%= path.temp %>/',
          starttag: '<!-- injector:tpl -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= path.client.dist %>/index.html': [
            '<%= path.temp %>/*.templates.js'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= path.client.source %>',
          dest: '<%= path.client.dist %>',
          src: [
            '*.{ico,png,txt}',
            'assets/fonts/*',
            '.htaccess',
            'index.html'
          ],
          filter: 'isFile'
        }]
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: true
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      }
    },

    // minify images
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.client.source %>/assets',
          src: ['{,*/}*.{png,jpg,jpeg,gif}'],
          dest: '<%= path.client.dist %>/assets'
        }]
      }
    },

    // minify svg images
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.client.source %>/assets',
          src: [
            '{,*/}*.svg',
            '!fonts/*'
          ],
          dest: '<%= path.client.dist %>/assets'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.client.source %>/',
          src: 'src/**/*.js',
          dest: '<%= path.temp %>/'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        module: 'sampleJenkinsApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        // usemin: 'src/app.js'
      },
      dist: {
        cwd: '<%= path.client.source %>',
        src: ['src/**/*.html'],
        dest: '<%= path.temp %>/app.templates.js'
      }
    },

    watch: {
      scss: {
        files: [
          '<%= path.client.source %>/src/**/*.{sass,scss,css}',
          '<%= path.client.source %>/vendor/**/*.{sass,scss,css}'
        ],
        tasks: ['injector:sass','sass:dist'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: [
          '<%= path.client.source %>/vendor/**/*.js'
        ],
        tasks: ['wiredep'],
        options: {
          livereload: true
        }
      },
      js: {
        files: [
          '<%= path.client.source %>/src/**/*.js'
        ],
        tasks: ['injector:scripts'],
        options: {
          livereload: true
        }
      },
      resources: {
        files: [
          '<%= path.client.source %>/index.html',
          '<%= path.client.source %>/src/**/*.{html,js}',
          '<%= path.client.source %>/assets/**/*'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:tmp',
    'clean:dist',
    'injector:sass',
    'sass:dist',
    'imagemin',
    'svgmin',
    'injector:scripts',
    'wiredep',
    'copy:dist',
    'ngtemplates:dist',
    'ngAnnotate:dist',
    'injector:tpl',
    'useminPrepare',
    'concat',
    'usemin',
    'cssmin',
    'uglify',
    'clean:tmpSrc',
    'clean:tmpConcat',
    'clean:tmpTpl'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
