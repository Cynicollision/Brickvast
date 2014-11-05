module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-copy');

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

        copy: {
            main: {
                files: [
                  { src: 'build/vastengine.js', dest: 'demo/vastengine.js' },
                ]
            }
        }
    });

    // register the tasks
    grunt.registerTask('travis', ['jshint', 'jasmine']);
    grunt.registerTask('test', 'jasmine');
    grunt.registerTask('compile', 'closure-compiler');
    grunt.registerTask('copy_to_demo', ['copy']);
    grunt.registerTask('build', ['closure-compiler', 'copy_to_demo']);
    grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};