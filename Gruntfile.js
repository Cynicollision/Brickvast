module.exports = function (grunt) {

    // init
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'vastengine/src/*.js', 'vastengine/spec/*.js']
        },

        jasmine: {
            pivotal: {
                src: 'vastengine/src/*.js',
                options: {
                    specs: 'vastengine/spec/*Spec.js'
                }
            }
        },

        'closure-compiler': {
            engine: {
                closurePath: 'C:\\Users\\Sean\\workspace\\vastengine\\',
                js: 'vastengine/src/*',
                jsOutputFile: 'build/vastengine.js',
                maxBuffer: 500,
                options: {
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },

        clean: {
            build: ['build/vastengine.js'],
			'android assets/demo': ['VastDroid/app/src/main/assets/demo']
        },

        copy: {
            'build -> demo': {
                files: [
                  { src: 'build/vastengine.js', dest: 'vastengine/demo/vastengine.js' },
                ]
            },
			'demo -> android assets': {
				files: [
					{  cwd: 'vastengine/', src: 'demo/**', expand: true, dest: 'VastDroid/app/src/main/assets/' },
				]
			}
        },

        jsdoc: {
            dist: {
                src: ['vastengine/src/*.js'],
                options: {
                    destination: 'doc'
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
    grunt.registerTask('doc', 'jsdoc');
    grunt.registerTask('build', ['clean', 'closure-compiler', 'copy']);
    grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};