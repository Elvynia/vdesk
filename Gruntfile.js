module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'./src/main/webapp/css/backend.css': [
						'./bower_components/ngDialog/css/ngDialog.min.css',
						'./bower_components/ngDialog/css/ngDialog-theme-default.min.css',
						'./bower_components/angular-ui-select/dist/select.min.css',
						'./bower_components/select2-bootstrap-theme/dist/select2-bootstrap.min.css',
						'./bower_components/bootstrap/dist/css/bootstrap.min.css',
						'./bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
					],
					'./src/main/webapp/css/application.css': [
						'./src/main/resources/css/application.css'
					]
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			js_backend: {
				src: [
					'./bower_components/jquery/dist/jquery.js',
					'./bower_components/bootstrap/dist/js/bootstrap.js',
					'./bower_components/angular/angular.js',
					'./bower_components/angular-resource/angular-resource.js',
					'./bower_components/angular-route/angular-route.js',
					'./bower_components/ngDialog/js/ngDialog.js',
					'./bower_components/ng-focus-if/focusIf.js',
					'./bower_components/angular-ui-select/dist/select.js',
					'./bower_components/angular-sanitize/angular-sanitize.js',
				],
				dest: './src/main/webapp/js/backend.js',
			},
			js_application: {
				src: [
					'./src/main/resources/js/services.js',
					'./src/main/resources/js/controllers.js',
					'./src/main/resources/js/application.js',
				],
				dest: './src/main/webapp/js/application.js',
			},
		},
		uglify : {
			options : {
				mangle : false // Use if you want the names of your functions and variables unchanged
			},
			js_all : {
				files : {
					'./src/main/webapp/js/backend.js' : './src/main/webapp/js/backend.js',
					'./src/main/webapp/js/application.js' : './src/main/webapp/js/application.js',
				}
			},
		}
	});

	// Load the plugins that provide defined tasks.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['cssmin', 'concat']); // 'uglify'

};
