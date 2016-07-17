System.config({
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true},
    map: {
        'ralm' : 'dist',
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
		'trilliangular': 'node_modules/trilliangular'
      },
      packages: {
        'ralm'                             : {main: 'main.js'},
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