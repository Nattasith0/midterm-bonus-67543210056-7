// frontend/js/app.js

let currentFilter = "all";
let cachedBooks = []; // เก็บไว้ใช้ตอน edit

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Library Management System - Client");
  document.getElementById("api-base").textContent = api.baseURL;

  setupEventListeners();
  await loadBooks();
});

function setupEventListeners() {
  document.getElementById("filter-all").addEventListener("click", () => {
    setActiveFilter("all");
    loadBooks();
  });

  document.getElementById("filter-available").addEventListener("click", () => {
    setActiveFilter("available");
    loadBooks("available");
  });

  document.getElementById("filter-borrowed").addEventListener("click", () => {
    setActiveFilter("borrowed");
    loadBooks("borrowed");
  });

  document.getElementById("add-book-btn").addEventListener("click", () => {
    showBookForm();
  });

  document.getElementById("book-form").addEventListener("submit", handleFormSubmit);
}

function setActiveFilter(filter) {
  currentFilter = filter;

  ["filter-all", "filter-available", "filter-borrowed"].forEach((id) => {
    document.getElementById(id).classList.remove("active");
  });

  if (filter === "all") document.getElementById("filter-all").classList.add("active");
  if (filter === "available") document.getElementById("filter-available").classList.add("active");
  if (filter === "borrowed") document.getElementById("filter-borrowed").classList.add("active");
}

async function loadBooks(status = null) {
  try {
    showLoading();

    const result = await api.getAllBooks(status);
    cachedBooks = result.books || [];

    updateStatistics(result.statistics || { available: 0, borrowed: 0, total: cachedBooks.length });
    renderBookList(cachedBooks);

    hideLoading();
  } catch (error) {
    console.error("Error loading books:", error);
    alert("Failed to load books: " + error.message);
    hideLoading();
  }
}

async function borrowBook(id) {
  try {
    if (!confirm("Borrow this book?")) return;
    await api.borrowBook(id);
    await loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    console.error("Error borrowing book:", error);
    alert("Failed to borrow book: " + error.message);
  }
}

async function returnBook(id) {
  try {
    if (!confirm("Return this book?")) return;
    await api.returnBook(id);
    await loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    console.error("Error returning book:", error);
    alert("Failed to return book: " + error.message);
  }
}

async function deleteBook(id) {
  try {
    if (!confirm("Delete this book?")) return;
    await api.deleteBook(id);
    await loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    console.error("Error deleting book:", error);
    alert("Failed to delete book: " + error.message);
  }
}

function editBook(id) {
  const book = cachedBooks.find((b) => String(b.id) === String(id));
  if (!book) return alert("Book not found in current list");
  showBookForm(book);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const id = document.getElementById("book-id").value.trim();
  const payload = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    isbn: document.getElementById("isbn").value.trim(),
  };

  try {
    if (id) {
      await api.updateBook(id, payload);
      alert("Book updated!");
    } else {
      await api.createBook(payload);
      alert("Book created!");
    }

    hideBookForm();
    await loadBooks(currentFilter === "all" ? null : currentFilter);
  } catch (error) {
    console.error("Form submit error:", error);
    alert("Failed to save book: " + error.message);
  }
}

function updateStatistics(stats) {
  document.getElementById("stat-available").textContent = stats.available ?? 0;
  document.getElementById("stat-borrowed").textContent = stats.borrowed ?? 0;
  document.getElementById("stat-total").textContent = stats.total ?? 0;
}

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
