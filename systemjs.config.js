System.config({
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true},
    map: {
        'ramm' : 'dist',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
		'trilliangular': 'node_modules/trilliangular'
      },
      packages: {
        'ramm'                             : {main: 'main.js'},
		'trilliangular'                    : {main: 'main.js'},
        'rxjs'                             : {main: 'index.js'},
        '@angular/core'                    : {main: 'index.js'},
        '@angular/common'                  : {main: 'index.js'},
        '@angular/compiler'                : {main: 'index.js'},
		'@angular/http'                    : {main: 'index.js'},
        '@angular/platform-browser'        : {main: 'index.js'},
        '@angular/platform-browser-dynamic': {main: 'index.js'}
      }
});

/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths : {
            // paths serve as alias
            'npm:' : 'node_modules/'
        },
        // map tells the System loader where to look for things
        map : {
            'ramm' : 'dist',
            'trilliangular' : 'npm:trilliangular',

            // angular bundles
            '@angular/core' : 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common' : 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler' : 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser' : 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic' : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http' : 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router' : 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms' : 'npm:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs' : 'npm:rxjs',
            'angular2-in-memory-web-api' : 'npm:angular2-in-memory-web-api',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages : {
            ramm : {
                main: 'main.js',
                defaultExtension : 'js'
            },
            trilliangular : {
                main : 'main.js',
                defaultExtension : 'js'
            },
            rxjs : {
                defaultExtension : 'js'
            },
            'angular2-in-memory-web-api' : {
                defaultExtension : 'js'
            }
        }
    });
})(this);