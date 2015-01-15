'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'), // read package.json to get some info.

        watch: {
            options: {
                nospawn: true
            },

            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'public/*.html',
                    'public/modules/**/*.html',
                    'public/assets/**/*.scss',
                    'public/assets/**/*.js',
                    'public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'public/assets/fonts/*',
                    'public/assets/vender/**/*.{js,css}'
                ]
            },

            // use as a children task for check...
            // html: {
            //     files: ['public/index.html', 'public/modules/**.html'],
            //     tasks: ['checkhtml'] 
            // },
            scss: {
                files: ['public/assets/scss/*.scss'],
                tasks: ['buildscss']
            },
                   
            js: {
                files: ['public/assets/js/**/*.js', 'public/assets/js/*.js'],
                tasks: ['buildjs']
            },

            fonts: {
                files: ['public/assets/fonts/*'],
                tasks: ['clean:fonts','copy:fonts']
            },

            images: {
                files: ['public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'],
                tasks: ['clean:images','imagemin']
            },

            css: {
                files: ['public/assets/vender/css/*.css'],
                tasks: ['buildcss'] // scss要一起build才行
            }                    
        }, // watch 

        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'public'),
                            lrSnippet
                        ];
                    }
                }
            }
        }, // connect as a local server

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }, //open browser

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['public/index.html', 'public/modules/**/*.html']
            }
        }, // html hint

        sass: {
          dist: {
            files: [{
              expand: true,
              cwd: 'public/assets/scss',
              src: ['*.scss'],
              dest: 'public/build/stylesheet/css/',
              ext: '.css'
            }]
          }
        }, //build scss

        uglify: {
            options: {
                //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n'//添加banner
            },
            buildall: {//按原文件结构压缩js文件夹内所有JS文件
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: 'some', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                },
                files: [{
                    expand: true,
                    cwd: 'public/assets/js',//js目录下
                    src: '**/*.js',//所有js文件
                    dest: 'public/build/javascript/js'//输出到此目录下
                }]
            }
        }, // js uglify

        concat: {
            options: {
                mangle: false, //不混淆变量名
                preserveComments: 'some', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                banner:'/*! \n  Project  Name: <%= pkg.name %> \n  Last Modified: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'//添加banner
            },
            js: {  
                src: [
                    'public/build/javascript/js/app.js'
                ],  
                dest: 'public/build/javascript/app-build.js' 
            },  

            css: {
                src: ['public/build/stylesheet/css/*.css'],
                dest:'public/build/stylesheet/css/app.css'
            }
        }, // concat js and css

        cssmin: {
            minall: {
                expand: true,
                cwd: 'public/build/stylesheet/css/',
                src: ['*.css'],
                dest: 'public/build/stylesheet/css/min',
                ext: '.min.css'
            },
            minappcss: {
                src: ['public/build/stylesheet/css/app.css'],
                dest:'public/build/stylesheet/app-build.css'
            }
        }, // css min, only app-build.css to min...

        // https://www.npmjs.com/package/grunt-contrib-imagemin
        imagemin: {                          // Task
            foldermin: {                         // target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'public/assets/images/',  // Src matches are relative to this path
                src: ['*.{png,jpg,gif}'],      // Actual patterns to match
                dest: 'public/build/images/'   // Destination path prefix
              }]
            }
        },

        // https://www.npmjs.com/package/grunt-contrib-clean
        // clean the build or no-use assets and files.
        clean: {
          fonts: ["public/build/fonts/"], 
          images: ["public/build/images/"], 
          css: ["public/build/stylesheet/css/"], 
          js: ['public/build/javascript/js/']
        },

        // https://www.npmjs.com/package/grunt-contrib-copy
        // In my opinion, copy is used to copy resource to build path,
        // because build path is a folder that all files should be auto-created.
        copy: {
          fonts: {
            files: [
              // makes all src relative to cwd
              {expand: true, cwd: 'public/assets/', src: ['fonts/*'], dest: 'public/build/'}                           
            ],
          },
          css: {
            files: [            
              {expand: true, cwd: 'public/assets/vender/css/', src: ['*.css'], dest: 'public/build/stylesheet/css/'}                    
            ],
          }
        }

    });
    // Tasks config end...
 
    // basic tasks
    grunt.registerTask('buildscss', 'build scss files...', ['sass','concat:css', 'cssmin']);
    grunt.registerTask('buildjs', 'build js files...', ['uglify', 'concat:js']);
    grunt.registerTask('buildimages', 'build images files...', ['imagemin']);
     
    // manual tasks (手动任务)
    grunt.registerTask('checkhtml', 'check html files...', ['htmlhint']);
    grunt.registerTask('buildcss', 'build css files...', ['clean:css', 'copy:css', 'buildscss']);
    grunt.registerTask('buildcssjs', 'build all css and js files...', ['buildcss', 'buildjs']);
    grunt.registerTask('buildall', 'build all files...', ['buildscss', 'buildjs', 'buildimages']);
    grunt.registerTask('mv2bdfolder', 'move files to build folder...', ['clean', 'copy:fonts', 'copy:css']);
    
    // helper tasks
    grunt.registerTask('rebuild', 'rebuild all files...', ['mv2bdfolder', 'buildall']); 
    
    // workflow task
    grunt.registerTask('workflow', function (target) { // start task
        grunt.task.run([
            'rebuild', //make app runs well even in the first time
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

};