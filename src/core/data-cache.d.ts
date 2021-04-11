// MOST Web Framework 2.0 Codename Blueshift Copyright (c) 2017-2020, THEMOST LP All rights reserved
import {ConfigurationStrategy} from "@themost/common";

export declare abstract class DataCacheStrategy extends ConfigurationStrategy {

    abstract add(key: string, value: any, absoluteExpiration?: number): Promise<any>;

    abstract remove(key: string): Promise<any>;

    abstract clear(): Promise<any>;

    abstract get(key: string): Promise<any>;

    abstract getOrDefault(key: string, getFunc: Promise<any>, absoluteExpiration?: number): Promise<any>;

}
