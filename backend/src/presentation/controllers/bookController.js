// backend/src/presentation/controllers/bookController.js
const bookService = require("../../business/services/bookService");

class BookController {
  async getAllBooks(req, res, next) {
    try {
      const { status } = req.query;
      const result = await bookService.getAllBooks(status);

      return res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await bookService.getBookById(id);

      return res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const bookData = req.body;
      const result = await bookService.createBook(bookData);

      return res.status(201).json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const bookData = req.body;
      const result = await bookService.updateBook(id, bookData);

      return res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async borrowBook(req, res, next) {
    try {
      const { id } = req.params;
      const result = await bookService.borrowBook(id);

      return res.json({
        success: true,
        data: result,
       timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req, res, next) {
    try {
      const { id } = req.params;
      const result = await bookService.returnBook(id);

      return res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      const result = await bookService.deleteBook(id);

      return res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();
