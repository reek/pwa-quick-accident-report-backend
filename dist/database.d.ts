import * as mongoose from 'mongoose';
export declare class Database {
    private uri;
    private user?;
    private pass?;
    private db;
    constructor(uri: string, user?: string, pass?: string);
    connect(): Promise<typeof mongoose>;
    disconnect(): Promise<void>;
}
