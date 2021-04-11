// MOST Web Framework 2.0 Codename Blueshift Copyright (c) 2017-2020, THEMOST LP All rights reserved
import {ConfigurationStrategy} from "@themost/common";
import {DataCacheStrategy} from '../core/data-cache';

export declare class DefaultDataCacheStrategy extends DataCacheStrategy {

    add(key: string, value: any, absoluteExpiration?: number): Promise<any>;

    remove(key: string): Promise<any>;

    clear(): Promise<any>;

    get(key: string): Promise<any>;

    getOrDefault(key: string, getFunc: Promise<any>, absoluteExpiration?: number): Promise<any>;

}
