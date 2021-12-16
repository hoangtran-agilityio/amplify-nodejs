/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BOOKS_ARN
	STORAGE_BOOKS_NAME
	STORAGE_BOOKS_STREAMARN
Amplify Params - DO NOT EDIT */
// import { listBooks } from "./services/book.service";

// import { Response } from "./interface/response.interface";

// import * as express from "express";
// import { booksRouter } from "./routes/books.route";

import * as awsServerlessExpress from "aws-serverless-express";

import { app } from "./app";

const server = awsServerlessExpress.createServer(app);

export const handler = async (event, context) => {
    console.log("Event: ", JSON.stringify(event));

    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

// const getBook = async (id: string): Promise<Book> => {

// }

// const createBook = async (newBook: Book): Promise<Book> => {

// } 
