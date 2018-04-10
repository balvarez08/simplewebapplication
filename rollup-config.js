import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';

//paths are relative to the execution path
export default {
    entry: 'Client/src/main-aot.js',
    dest: 'Scripts/build.js', // output a single application bundle    
    sourceMap: true,
    treeshake:true,
    sourceMapFile: 'Scripts/build.js.map',
    format: 'iife',
    onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    // intercepts in some rollup versions
    if ( warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }

    // console.warn everything else
    console.warn( warning.message );
   },
plugins: [
  nodeResolve({jsnext: true, module: true}),
  commonjs({
     namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        '../node_modules/rxjs/symbol/observable.js': [ '$$observable' ]
      }
  }),
  uglify({}, minify)
]
}
