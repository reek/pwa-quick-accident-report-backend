import { Schema, Document } from 'mongoose';
export interface IMovieAuthorModel {
    _id?: string;
    name: string;
    movies: Schema.Types.ObjectId[];
}
export declare const movieAuthorSchema: Schema<any>;
export interface IMovieAuthorDoc extends Document {
    name: string;
    year: number;
    language: string;
}
export declare const movieAuthorModel: import("mongoose").Model<IMovieAuthorDoc, {}>;
