// MOST Web Framework 2.0 Codename Blueshift BSD-3-Clause license Copyright (c) 2017-2021, THEMOST LP All rights reserved
import { ModuleLoader } from "../core/module-loader";

export declare class DefaultModuleLoader extends  ModuleLoader {
    constructor(executionPath: string);
    getExecutionPath(): string;
    require(modulePath: string): any;
}
