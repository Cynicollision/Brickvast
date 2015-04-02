module.exports = function (grunt) {

    // init
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'engine/src/*.js', 'engine/spec/*.js']
        },

        jasmine: {
            'run-all-tests': {
                src: ['engine/src/namespace.js', 'engine/src/*.js'],
                options: {
                    specs: 'engine/spec/*Spec.js'
                }
            }
        },

        clean: {
            'engine/build': ['engine/build/vastengine.js']
        },

        copy: {
            'build -> demo': {
                files: [
                  { src: 'engine/build/vastengine.js', dest: 'engine/demo/vastengine.js' },
                ]
            }
        },

        //copy2droid: {
		//	'demo -> android assets': {
        //        files: [
        //            { cwd: '../', src: 'demo/**', expand: true, dest: 'VastDroid/app/src/main/assets/' },
        //        ]
		//	}
        //},

        jsdoc: {
            dist: {
                src: ['engine/src/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'engine/build/vastengine.js': [
					'engine/src/namespace.js',
					'engine/src/*.js'
					]
                }
            }
        }
		
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    

    // register the tasks
    grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('build', ['clean', 'uglify', 'copy']);
    grunt.registerTask('doc', 'jsdoc');
	
	// might be handy someday
	grunt.registerTask('execit', 'exec');
    
	grunt.registerTask('default', function () {
        grunt.log.write('So vast!').ok();
    });
};