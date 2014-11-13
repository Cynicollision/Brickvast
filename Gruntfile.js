module.exports = function (grunt) {

    // init
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'src/*.js', 'spec/*.js']
        },

        jasmine: {
            pivotal: {
                src: 'src/*.js',
                options: {
                    specs: 'spec/*Spec.js'
                }
            }
        },

        'closure-compiler': {
            engine: {
                closurePath: 'C:\\Users\\Sean\\workspace\\vastengine\\',
                js: 'src/*',
                jsOutputFile: 'build/vastengine.js',
                maxBuffer: 500,
                options: {
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },

        clean: {
            build: ['build/vastengine.js']
        },

        copy: {
            main: {
                files: [
                  { src: 'build/vastengine.js', dest: 'demo/vastengine.js' },
                ]
            }
        },

        jsdoc: {
            dist: {
                src: ['src/*.js'],
                options: {
                    destination: 'api'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');
    

    // register the tasks
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('api', 'jsdoc');
    grunt.registerTask('build', ['clean', 'closure-compiler', 'copy']);
    grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};