// MOST Web Framework 2.0 Codename Blueshift Copyright (c) 2017-2022, THEMOST LP All rights reserved
/**
 * @param {*} any
 * @param {Function} ctor
 * @returns {boolean}
 */
function instanceOf(any, ctor) {
    // validate constructor
    if (typeof ctor !== 'function') {
        return false
    }
    // validate with instanceof
    if (any instanceof ctor) {
        return true;
    }
    return !!(any && any.constructor && any.constructor.name === ctor.name);
}

module.exports = {
    instanceOf
};

