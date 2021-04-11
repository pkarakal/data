// MOST Web Framework 2.0 Codename Blueshift BSD-3-Clause license Copyright (c) 2017-2021, THEMOST LP All rights reserved
import { ModuleLoader } from '@themost/d/core';
const executionPathProperty = Symbol('executionPath');
import { resolve, join } from 'path';
/**
 * @class
 * @param {string} executionPath
 * @constructor
 * @augments ModuleLoader
 * @extends ModuleLoader
 */
class DefaultModuleLoader extends ModuleLoader {
    constructor(executionPath) {
        super();
        this[executionPathProperty] = resolve(executionPath) || process.cwd();
    }
    getExecutionPath() {
        return this[executionPathProperty];
    }
    /**
     * @param {string} modulePath
     * @returns {*}
     */
    require(modulePath) {
        if (!/^.\//i.test(modulePath)) {
            //load module which is not starting with ./
            if (require.main && typeof require.main.require === 'function') {
                return require.main.require(modulePath);
            }
            return require(modulePath);
        }
        return require(join(this.getExecutionPath(), modulePath));
    }
}

export {
    DefaultModuleLoader
}