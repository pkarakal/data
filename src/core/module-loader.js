// MOST Web Framework 2.0 Codename Blueshift BSD-3-Clause license Copyright (c) 2017-2021, THEMOST LP All rights reserved

/**
 * @class
 * @abstract
 */
class ModuleLoader {
    constructor() {
        if (this.constructor.name === 'ModuleLoader') {
            throw new Error('An abstract class cannot be instantiated.');
        }
    }
    /**
     * @param {string} modulePath
     * @returns {*}
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars
    require(modulePath) {
        throw new Error('Class does not implement inherited abstract method.');
    }
}


module.exports = {
    ModuleLoader
}
