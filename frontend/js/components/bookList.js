// frontend/js/components/bookList.js
function renderBookList(books) {
    const container = document.getElementById("book-list");

    if (!books || books.length === 0) {
        container.innerHTML = `<div class="book-card"><p>No books found</p></div>`;
        return;
    }

    const html = books
        .map(
            (book) => `
    <div class="book-card" data-id="${book.id}">
      <h3>${escapeHtml(book.title)}</h3>
      <p><strong>Author:</strong> ${escapeHtml(book.author)}</p>
      <p><strong>ISBN:</strong> ${escapeHtml(book.isbn)}</p>
      <p><strong>Status:</strong>
        <span class="status ${book.status}">${book.status}</span>
      </p>

      <div class="actions">
        ${book.status === "available"
                    ? `<button onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button onclick="returnBook(${book.id})">Return</button>`
                }
        <button onclick="editBook(${book.id})">Edit</button>
        <button onclick="deleteBook(${book.id})" class="danger">Delete</button>
      </div>
    </div>
  `
        )
        .join("");

    container.innerHTML = html;
}

// กัน XSS ง่ายๆ
function escapeHtml(str) {
    return String(str ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
