
import { DynamoDB } from 'aws-sdk';
import { Book } from "../interface/book.interface";

const {
  ENV,
  REGION,
  STORAGE_BOOKS_ARN,
  STORAGE_BOOKS_NAME,
  STORAGE_BOOKS_STREAMARN
} = process.env;

const dynamoDb = new DynamoDB.DocumentClient({ region: REGION })

export const listBooks = async (): Promise<Book[]> => {
  const params = {
    TableName: STORAGE_BOOKS_NAME,
  };

  const data = await dynamoDb.scan(params).promise();
  const books: Book[] = data.Items?.map((item) => <Book> {
    id: item.id,
    title: item.title,
    author: item.author,
    description: item.description,
    image: item.image,
    score: item.score
  });
  return books;
}

export const getBook = async (id: string): Promise<Book> => {
  const params = {
    TableName: STORAGE_BOOKS_NAME,
    Key: {
      id: id
    }
  };
  const data = await dynamoDb.get(params).promise();

  const book: Book = {
    id: data.Item?.id,
    title: data.Item?.title,
    author: data.Item?.author,
    description: data.Item?.description,
    image: data.Item?.image,
    score: data.Item?.score
  }
  return book;
}

export const addBook = async (book: Book): Promise<Book> => {
  const params = {
    TableName: STORAGE_BOOKS_NAME,
    Item: book
  }

  const result = await dynamoDb.put(params).promise();
  return book;
}

export const updateBook = async (id: string, book: Book) => {
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
}

const buildUpdateExpression = (data) => {
  let updateExpression = 'set';
  const keys = Object.keys(data);
  let key = null;
  for (let index = 0, total = keys.length; index < total; index++) {
    key = keys[index];
    if (index + 1 === total) {
      updateExpression += ` #${key} = :${key}`;
    } else {
      updateExpression += ` #${key} = :${key},`;
    }
  }
  return updateExpression;
}

const buildExpressionAttributeNames = (data) => {
  const attributeNames = {};
  for (const key in data) {
    attributeNames[`#${key}`] = `${key}`;
  }
  return attributeNames;
}

const buildExpressionAttributeValues = (data) => {
  const attributeValues = {};
  for (const key in data) {
    attributeValues[`:${key}`] = data[key];
  }
  return attributeValues;
}