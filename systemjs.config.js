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
            // our app is within the app folder
            'ramm' : 'dist',
            '@trilliangular/core' : 'npm:@trilliangular/core/dist',
            '@trilliangular/inputs' : 'npm:@trilliangular/inputs/dist',
            '@trilliangular/runtime-three' : 'npm:@trilliangular/runtime-three/dist',

            // angular bundles
            '@angular/core' : 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common' : 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler' : 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/http' : 'npm:@angular/http/bundles/http.umd.js',
            '@angular/forms' : 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/platform-browser' : 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic' : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',

            // other libraries
            'rxjs' : 'npm:rxjs',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages : {
            'ramm': {
                main: 'main-dev.js',
                defaultExtension : 'js'
            },
            '@trilliangular/core': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@trilliangular/inputs': {
                main: 'index.js',
                defaultExtension: 'js'
            },
            '@trilliangular/runtime-three' : {
                main: 'index.js',
                defaultExtension : 'js'
            },
            rxjs : {
                defaultExtension : 'js'
            }
        }
    });
})(this);