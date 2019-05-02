import * as mongoose from 'mongoose';

export class Database {
  private db: mongoose.Mongoose = mongoose; // mongoose is an instance of class mongoose.Mongoose

  constructor(
    private uri: string,
    private user?: string,
    private pass?: string,
  ) { }

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


