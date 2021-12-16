"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.addBook = exports.getBook = exports.listBooks = void 0;
const aws_sdk_1 = require("aws-sdk");
const { ENV, REGION, STORAGE_BOOKS_ARN, STORAGE_BOOKS_NAME, STORAGE_BOOKS_STREAMARN } = process.env;
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient({ region: REGION });
const listBooks = async () => {
    var _a;
    const params = {
        TableName: STORAGE_BOOKS_NAME,
    };
    const data = await dynamoDb.scan(params).promise();
    const books = (_a = data.Items) === null || _a === void 0 ? void 0 : _a.map((item) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        description: item.description,
        image: item.image,
        score: item.score
    }));
    return books;
};
exports.listBooks = listBooks;
const getBook = async (id) => {
    var _a, _b, _c, _d, _e, _f;
    const params = {
        TableName: STORAGE_BOOKS_NAME,
        Key: {
            id: id
        }
    };
    const data = await dynamoDb.get(params).promise();
    const book = {
        id: (_a = data.Item) === null || _a === void 0 ? void 0 : _a.id,
        title: (_b = data.Item) === null || _b === void 0 ? void 0 : _b.title,
        author: (_c = data.Item) === null || _c === void 0 ? void 0 : _c.author,
        description: (_d = data.Item) === null || _d === void 0 ? void 0 : _d.description,
        image: (_e = data.Item) === null || _e === void 0 ? void 0 : _e.image,
        score: (_f = data.Item) === null || _f === void 0 ? void 0 : _f.score
    };
    return book;
};
exports.getBook = getBook;
const addBook = async (book) => {
    const params = {
        TableName: STORAGE_BOOKS_NAME,
        Item: book
    };
    const result = await dynamoDb.put(params).promise();
    return book;
};
exports.addBook = addBook;
const updateBook = async (id, book) => {
    const params = {
        TableName: STORAGE_BOOKS_NAME,
        Key: {
            id: id
        },
        UpdateExpression: buildUpdateExpression(book),
        ExpressionAttributeNames: buildExpressionAttributeNames(book),
        ExpressionAttributeValues: buildExpressionAttributeValues(book)
    };
    console.log('params', JSON.stringify(params));
    await dynamoDb.update(params).promise();
};
exports.updateBook = updateBook;
const buildUpdateExpression = (data) => {
    let updateExpression = 'set';
    const keys = Object.keys(data);
    let key = null;
    for (let index = 0, total = keys.length; index < total; index++) {
        key = keys[index];
        if (index + 1 === total) {
            updateExpression += ` #${key} = :${key}`;
        }
        else {
            updateExpression += ` #${key} = :${key},`;
        }
    }
    return updateExpression;
};
const buildExpressionAttributeNames = (data) => {
    const attributeNames = {};
    for (const key in data) {
        attributeNames[`#${key}`] = `${key}`;
    }
    return attributeNames;
};
const buildExpressionAttributeValues = (data) => {
    const attributeValues = {};
    for (const key in data) {
        attributeValues[`:${key}`] = data[key];
    }
    return attributeValues;
};
