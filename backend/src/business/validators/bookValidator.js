// backend/src/business/validators/bookValidator.js

function validateBookPayload(payload) {
  if (!payload || typeof payload !== "object") {
    const err = new Error("Invalid payload");
    err.statusCode = 400;
    throw err;
  }

  const { title, author, isbn } = payload;

  if (!title || typeof title !== "string" || title.trim() === "") {
    const err = new Error("Title is required");
    err.statusCode = 400;
    throw err;
  }

  if (!author || typeof author !== "string" || author.trim() === "") {
    const err = new Error("Author is required");
    err.statusCode = 400;
    throw err;
  }

  if (!isbn || typeof isbn !== "string" || isbn.trim() === "") {
    const err = new Error("ISBN is required");
    err.statusCode = 400;
    throw err;
  }

  // return normalized payload
  return {
    title: title.trim(),
    author: author.trim(),
    isbn: isbn.trim(),
  };
}

module.exports = {
  validateBookPayload,
};
