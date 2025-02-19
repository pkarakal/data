// MOST Web Framework 2.0 Codename Blueshift Copyright (c) 2017-2022, THEMOST LP All rights reserved
import {DataQueryable} from "./data-queryable";
import {DataAssociationMapping, DataField} from "./types";
import {DataModel} from "./data-model";
import {DataObject} from "./data-object";

export declare class DataObjectTag extends DataQueryable {

    constructor(parent: any, mapping: DataAssociationMapping | string);
    parent: DataObject;
    mapping: DataAssociationMapping;
    getBaseModel(): DataModel;
    getObjectField(): string;
    getValueField(): string;
    insert(obj: any): Promise<any>;
    remove(obj: any): Promise<any>;
    removeAll(): Promise<any>;
    migrate(callback: (err?: Error) => void): void;
    migrateAsync(): Promise<void>;
}
