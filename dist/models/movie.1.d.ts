import * as mongoose from 'mongoose';
export declare const movieSchema: mongoose.Schema<any>;
export interface IMovieDoc extends mongoose.Document {
    name: string;
    year: number;
    language: string;
}
export declare const movieModel: mongoose.Model<IMovieDoc, {}>;
