// eslint-disable-next-line no-unused-vars
const dts = require('rollup-plugin-dts').default;
const babel = require('@rollup/plugin-babel').default;
const pkg = require('./package.json');
module.exports = [{
    input: './src/core/index.js',
    output: [
        {
            name: '@themost/d/core',
            file: 'core/index.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/d/core',
            file: 'core/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/d/core',
            file: 'core/index.umd.js',
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)),
    plugins: [
        babel()
    ]
}, {
    input: './src/platform-server/index.js',
    output: [
        {
            name: '@themost/d/platform-server',
            file: 'platform-server/index.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/d/platform-server',
            file: 'platform-server/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/d/platform-server',
            file: 'platform-server/index.umd.js',
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
        .concat('@themost/d/core'),
    plugins: [
        babel()
    ]
}, {
    input: './src/core/index.d.ts',
    output: [{
        file: 'core/index.d.ts'
    }],
    plugins: [
        dts()
    ],
    external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
}, {
    input: './src/platform-server/index.d.ts',
    output: [{
        file: 'platform-server/index.d.ts'
    }],
    external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
        .concat('@themost/data/core'),
    plugins: [
        dts()
    ],
}];