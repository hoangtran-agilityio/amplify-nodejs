"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const awsServerlessExpress = require("aws-serverless-express");
const app_1 = require("./app");
const server = awsServerlessExpress.createServer(app_1.app);
const handler = async (event, context) => {
    console.log("Event: ", JSON.stringify(event));
    return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
exports.handler = handler;
