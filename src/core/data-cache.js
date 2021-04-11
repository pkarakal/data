// MOST Web Framework 2.0 Codename Blueshift BSD-3-Clause license Copyright (c) 2017-2021, THEMOST LP All rights reserved

const {LangUtils, Args, AbstractMethodError, ConfigurationStrategy} = require('@themost/common')
const {hasOwnProperty} = require('./has-own-property');
const CACHE_ABSOLUTE_EXPIRATION = 1200;

class DataCacheStrategy extends ConfigurationStrategy {
    // noinspection JSValidateJSDoc
    /**
     * @param {ConfigurationBase} config
     */
    constructor(config) {
        super(config);
    }
    /**
     * Sets a key value pair in cache.
     * @abstract
     * @param {string} key - A string that represents the key of the cached value
     * @param {*} value - The value to be cached
     * @param {number=} absoluteExpiration - An absolute expiration time in seconds. This parameter is optional.
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    add(key, value, absoluteExpiration) {
        throw new AbstractMethodError();
    }
    /**
     * Removes a cached value.
     * @abstract
     * @param {string} key - A string that represents the key of the cached value to be removed
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    remove(key) {
        throw new AbstractMethodError();
    }
    /**
     * Flush all cached data.
     * @abstract
     * @returns {Promise|*}
     */
    clear() {
        throw new AbstractMethodError();
    }
    /**
     * Gets a cached value defined by the given key.
     * @param {string} key
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    get(key) {
        throw new AbstractMethodError();
    }
    /**
     * Gets data from cache or executes the defined function and adds the result to the cache with the specified key
     * @param {string|*} key - A string which represents the key of the cached data
     * @param {Function} getFunc - A function to execute if data will not be found in cache
     * @param {number=} absoluteExpiration - An absolute expiration time in seconds. This parameter is optional.
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    getOrDefault(key, getFunc, absoluteExpiration) {
        throw new AbstractMethodError();
    }
}

// noinspection JSValidateJSDoc
/**
 *
 * @param {ConfigurationBase} config
 * @constructor
 *
 */
class DefaultDataCacheStrategy extends DataCacheStrategy {
    constructor(config) {
        super(config);
        let NodeCache = require('node-cache');
        let expiration = CACHE_ABSOLUTE_EXPIRATION;
        let absoluteExpiration = LangUtils.parseInt(config.getSourceAt('settings/cache/absoluteExpiration'));
        if (absoluteExpiration > 0) {
            expiration = absoluteExpiration;
        }
        this.rawCache = new NodeCache({
            stdTTL: expiration
        });
    }
    /**
     * Sets a key value pair in cache.
     * @param {string} key - A string that represents the key of the cached value
     * @param {*} value - The value to be cached
     * @param {number=} absoluteExpiration - An absolute expiration time in seconds. This parameter is optional.
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    add(key, value, absoluteExpiration) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.rawCache.set(key, value, absoluteExpiration, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
    /**
     * Gets a cached value defined by the given key.
     * @param {string} key
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    get(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.rawCache.get(key, function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res[key]);
            });
        });
    }
    /**
     * Removes a cached value.
     * @param {string} key - A string that represents the key of the cached value to be removed
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    remove(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.rawCache.del(key, function (err, count) {
                if (err) {
                    return reject(err);
                }
                return resolve(count);
            });
        });
    }
    /**
     * Flush all cached data.
     * @returns {Promise|*}
     */
    clear() {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.rawCache.flushAll(function (err, count) {
                if (err) {
                    return reject(err);
                }
                return resolve(count);
            });
        });
    }
    /**
     * Gets data from cache or executes the defined function and adds the result to the cache with the specified key
     * @param {string|*} key - A string which represents the key of the cached data
     * @param {Function} getFunc - A function to execute if data will not be found in cache
     * @param {number=} absoluteExpiration - An absolute expiration time in seconds. This parameter is optional.
     * @returns {Promise|*}
     */
    // eslint-disable-next-line no-unused-vars
    getOrDefault(key, getFunc, absoluteExpiration) {
        let self = this;
        return new Promise(function (resolve, reject) {
            //try to get from cache
            self.rawCache.get(key, function (err, result) {
                if (err) {
                    return reject(err);
                } else if (typeof result !== 'undefined' && hasOwnProperty(result, key)) {
                    return resolve(result[key]);
                } else {
                    try {
                        //execute function and validate promise
                        let source = getFunc();
                        Args.check(typeof source !== 'undefined' && typeof source.then === 'function', 'Invalid argument. Expected a valid promise.');
                        return source.then(function (res) {
                            if (res == null) {
                                return resolve();
                            }
                            return self.rawCache.set(key, res, absoluteExpiration, function (err) {
                                if (err) {
                                    return reject(err);
                                }
                                return resolve(res);
                            });
                        })
                            .catch(function (err) {
                                return reject(err);
                            });
                    } catch (err) {
                        return reject(err);
                    }
                }
            });
        });
    }
}

module.exports = {
    DataCacheStrategy,
    DefaultDataCacheStrategy
};
