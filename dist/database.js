"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Database {
    constructor(uri, user, pass) {
        this.uri = uri;
        this.user = user;
        this.pass = pass;
        this.db = mongoose;
    }
    connect() {
        console.log('Connecting database to ' + this.uri);
        return this.db
            .connect(this.uri, { useNewUrlParser: true, user: this.user, pass: this.pass })
            .then(mongooseConnected => {
            console.log('Database connected to ' + this.uri);
            return mongooseConnected;
        });
    }
    disconnect() {
        return this.db.disconnect();
    }
}
exports.Database = Database;
