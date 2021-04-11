const rollup = require('rollup');
const pkg = require('./package.json');
module.exports = [{
    input: './src/core/index.js',
    output: [
        {
            name: '@themost/data/core',
            file: 'core/index.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/data/core',
            file: 'core/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/data/core',
            file: 'core/index.umd.js',
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)),
    plugins: [
    ]
}, {
    input: './src/platform-server/index.js',
    output: [
        {
            name: '@themost/data/platform-server',
            file: 'platform-server/index.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            name: '@themost/data/platform-server',
            file: 'platform-server/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            name: '@themost/data/platform-server',
            file: 'platform-server/index.umd.js',
            format: 'umd',
            sourcemap: true
        },
    ],
    external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
        .concat('@themost/data/core'),
    plugins: [
       
    ]
}, {
    input: './src/core/index.d.ts',
    output: [{
        file: 'core/index.d.ts'
    }],
    plugins: [
        
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
        
    ],
}];