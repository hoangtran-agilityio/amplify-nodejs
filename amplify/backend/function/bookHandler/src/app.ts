import { listBooks } from "./services/book.service";

import { Response } from "./interface/response.interface";
import * as awsServerlessExpressMiddleware  from "aws-serverless-express/middleware";

import * as express from "express";
import { booksRouter } from "./routes/books.route";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use("/", booksRouter);

app.listen(3000, () => {
  console.log('App started');
});