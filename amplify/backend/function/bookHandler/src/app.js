"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const express = require("express");
const books_route_1 = require("./routes/books.route");
exports.app = express();
exports.app.use(express.urlencoded({ extended: true }));
exports.app.use(express.json());
exports.app.use(express.json());
exports.app.use(awsServerlessExpressMiddleware.eventContext());
exports.app.use("/", books_route_1.booksRouter);
exports.app.listen(3000, () => {
    console.log('App started');
});
