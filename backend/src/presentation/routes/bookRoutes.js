// backend/src/presentation/routes/bookRoutes.js
const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

// GET /api/books?status=available|borrowed
router.get("/", (req, res, next) => bookController.getAllBooks(req, res, next));

// GET /api/books/:id
router.get("/:id", (req, res, next) => bookController.getBookById(req, res, next));

// POST /api/books
router.post("/", (req, res, next) => bookController.createBook(req, res, next));

// PUT /api/books/:id
router.put("/:id", (req, res, next) => bookController.updateBook(req, res, next));

// PATCH /api/books/:id/borrow
router.patch("/:id/borrow", (req, res, next) => bookController.borrowBook(req, res, next));

// PATCH /api/books/:id/return
router.patch("/:id/return", (req, res, next) => bookController.returnBook(req, res, next));

// DELETE /api/books/:id
router.delete("/:id", (req, res, next) => bookController.deleteBook(req, res, next));

module.exports = router;
