import * as express from "express";
import { Request, Response } from "express";
import {
  listBooks,
	getBook,
	addBook,
	updateBook,
  deleteBook
} from "../services/book.service";

import { 
  Book
} from "../interface/book.interface";

export const booksRouter = express.Router();

/**
 * Get books return list books
 */
booksRouter.get("/books", async (req: Request, res: Response) => {
  try {
    const items: Book[] = await listBooks();

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * Get a book with id return book
 */
booksRouter.get("/books/:id", async (req: Request, res: Response) => {
  try {
    const item: Book = await getBook(req.params.id);

    res.status(200).send(item);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * Create a book return book with status code 201
 */
booksRouter.post("/books", async (req: Request, res: Response) => {
  try {
		const book: Book = req.body;

    const newItem: Book = await addBook(book);

    res.status(201).send(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * Update a book with id and return success with status code 201
 */
booksRouter.put("/books/:id", async (req: Request, res: Response) => {
  try {
		const book: Book = req.body;

    await updateBook(req.params.id, book);

    res.status(201).send({"message": "Update success!"});
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/**
 * Delete a book with id and return success with status code 204
 */
booksRouter.delete("/books/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await deleteBook(id);

    res.sendStatus(204).send({"message": "Delete success!"});
  } catch (e) {
    res.status(500).send(e.message);
  }
});