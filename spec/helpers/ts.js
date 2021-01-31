const path = require('path');
require('ts-node').register({
    transpileOnly: true,
    project: path.resolve(__dirname, '../tsconfig.spec.json')
});