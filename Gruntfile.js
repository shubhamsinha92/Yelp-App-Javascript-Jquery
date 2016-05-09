module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js', 'src/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                src : 'src/**/*.js',
                dest : 'dist/js/build.min.js'
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': 'src/css/style.css'
                }
            }
        },
        imagemin: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.png','**/*.jpg'], // Actual pattern(s) to match.
                        dest: 'dist/img'
                    }
                ]
            }
        },
        htmlmin: {
            build:{
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.html'], // Actual pattern(s) to match.
                        dest: 'dist/html'
                    }
                ]
                }

        },
            watch: {
            // for stylesheets, watch css and less files
            // only run less and cssmin stylesheets: {
            files: ['src/**/*.css'],
            tasks: ['cssmin'],

        scripts: {
            files: ['src/**/*.js','src/**/*.html','src/**/*.css'], tasks: ['jshint', 'uglify','htmlmin','cssmin']
        }
    }


    // all of our configuration will go here

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.registerTask('default', ['jshint','uglify','cssmin','htmlmin','imagemin','watch']);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');



};