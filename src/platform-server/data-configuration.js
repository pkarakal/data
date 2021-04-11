// MOST Web Framework 2.0 Codename Blueshift BSD-3-Clause license Copyright (c) 2017-2021, THEMOST LP All rights reserved
import { DataConfiguration, DataConfigurationStrategy } from '@themost/d/core';

/**
 * Holds the configuration of data modeling infrastructure
 */
class DefaultDataConfiguration extends DataConfiguration {
    /**
     * @constructor
     * @param {string=} configPath - The root directory of configuration files. The default directory is the ./config under current working directory
     * @augments ConfigurationBase
     *
     */
    constructor(configPath) {
        super(configPath);
        //use default data configuration strategy
        this.useStrategy(DataConfigurationStrategy, DataConfigurationStrategy);
    }
    /**
     * @returns {DataConfigurationStrategy}
     */
    getDataConfiguration() {
        return this.getStrategy(DataConfigurationStrategy);
    }
    
}

export {
    DefaultDataConfiguration
}