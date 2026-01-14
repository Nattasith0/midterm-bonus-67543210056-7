const repo = require("../../data/repositories/bookRepository");
const { validateBookPayload } = require("../validators/bookValidator");

async function getAll(status) {
    const books = await repo.list(status);
    const available = books.filter(b => b.status === "available").length;
    const borrowed = books.filter(b => b.status === "borrowed").length;
    return { books, statistics: { available, borrowed, total: books.length } };
}

async function getById(id) {
    const book = await repo.findById(id);
    if (!book) {
        const err = new Error("Book not found");
        err.status = 404;
        throw err;
    }
    return book;
}

async function createBook(payload) {
    validateBookPayload(payload);
    try {
        const result = await repo.create({
            title: payload.title.trim(),
            author: payload.author.trim(),
            isbn: payload.isbn.trim(),
        });
        return { message: "Book created", id: result.id };
    } catch (e) {
        if (String(e.message).includes("UNIQUE")) {
            const err = new Error("ISBN already exists");
            err.status = 400;
            throw err;
        }
        throw e;
    }
}

async function updateBook(id, payload) {
    validateBookPayload(payload);
    try {
        const result = await repo.update(id, {
            title: payload.title.trim(),
            author: payload.author.trim(),
            isbn: payload.isbn.trim(),
        });
        if (result.changes === 0) {
            const err = new Error("Book not found");
            err.status = 404;
            throw err;
        }
        return { message: "Book updated" };
    } catch (e) {
        if (String(e.message).includes("UNIQUE")) {
            const err = new Error("ISBN already exists");
            err.status = 400;
            throw err;
        }
        throw e;
    }
}

async function borrowBook(id) {
    const book = await getById(id);
    if (book.status === "borrowed") {
        const err = new Error("Book is already borrowed");
        err.status = 400;
        throw err;
    }
    await repo.updateStatus(id, "borrowed");
    return { message: "Book borrowed" };
}

async function returnBook(id) {
    const book = await getById(id);
    if (book.status === "available") {
        const err = new Error("Book is already available");
        err.status = 400;
        throw err;
    }
    await repo.updateStatus(id, "available");
    return { message: "Book returned" };
}

async function deleteBook(id) {
  // 1) เช็คว่ามีหนังสือจริง + ได้ status มาด้วย
  const book = await getById(id);

  // 2) ถ้ายืมอยู่ ห้ามลบ
  if (book.status === "borrowed") {
    const err = new Error("Cannot delete a borrowed book. Please return it first.");
    err.status = 400; // หรือ 409 ก็ได้ แต่ 400 ใช้ง่าย
    throw err;
  }

  // 3) ถ้า available ค่อยลบ
  const result = await repo.remove(id);
  if (result.changes === 0) {
    const err = new Error("Book not found");
    err.status = 404;
    throw err;
  }

  return { message: "Book deleted" };
}


module.exports = {
  // ✅ alias ให้ตรงกับ controller / ใบงาน
  getAllBooks: getAll,
  getBookById: getById,

  // ✅ ของเดิม (ต้อง export ไว้ด้วย)
  createBook,
  updateBook,
  borrowBook,
  returnBook,
  deleteBook
};
