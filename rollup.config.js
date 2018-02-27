import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import resolve from 'rollup-plugin-node-resolve';

const packages = require('./package.json');
const name = packages.name.replace('@meitu/', '');
const paths = {
    input: `src/index.js`,
    output: `dist/`,
};

const configure = {
    input: paths.input,
    plugins: [
        babel(),
        sourcemaps(),
        resolve(),
    ],
};

if (process.env.NODE_ENV === 'production') {
    configure.plugins.push(uglify());
    configure.output = {
        name: packages.moduleName,
        file: `${paths.output}${name}.min.js`,
        format: 'umd',
        sourcemap: true,
    };
} else {
    const isExample = process.env.NODE_ENV === 'example';
    configure.output = [{
        name: packages.moduleName,
        file: isExample ? `example/dist/example.js` : `${paths.output}${name}.js`,
        format: 'umd',
    }, {
        file: `${paths.output}${name}.es.js`,
        format: 'es',
    }];
}

export default configure;
