"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express = require("express");
const book_service_1 = require("../services/book.service");
exports.booksRouter = express.Router();
exports.booksRouter.get("/books", async (req, res) => {
    try {
        const items = await (0, book_service_1.listBooks)();
        res.status(200).send(items);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
exports.booksRouter.get("/books/:id", async (req, res) => {
    try {
        const item = await (0, book_service_1.getBook)(req.params.id);
        res.status(200).send(item);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
exports.booksRouter.post("/books", async (req, res) => {
    try {
        const book = req.body;
        const newItem = await (0, book_service_1.addBook)(book);
        res.status(201).send(newItem);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
exports.booksRouter.put("/books/:id", async (req, res) => {
    try {
        const book = req.body;
        await (0, book_service_1.updateBook)(req.params.id, book);
        res.status(201).send({ "message": "Update success!" });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
exports.booksRouter.delete("/books/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await (0, book_service_1.deleteBook)(id);
        res.sendStatus(204).send({ "message": "Delete success!" });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
