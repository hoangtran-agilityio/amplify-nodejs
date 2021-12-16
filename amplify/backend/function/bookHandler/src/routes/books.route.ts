import * as express from "express";
import { Request, Response } from "express";
import {
  listBooks,
	getBook,
	addBook,
	updateBook
} from "../services/book.service";

import { 
  Book
} from "../interface/book.interface";

export const booksRouter = express.Router();

booksRouter.get("/books", async (req: Request, res: Response) => {
  try {
    const items: Book[] = await listBooks();

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

booksRouter.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const item: Book = await getBook(req.params.id);

    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

booksRouter.post("/books", async (req: Request, res: Response) => {
  try {
		const book: Book = req.body;

    const newItem: Book = await addBook(book);

    res.status(200).send(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

booksRouter.put("/books/:id", async (req: Request, res: Response) => {
  try {
		const book: Book = req.body;

    await updateBook(req.params.id, book);

    res.status(200).send({"message": "Update success!"});
  } catch (e) {
    res.status(500).send(e.message);
  }
});