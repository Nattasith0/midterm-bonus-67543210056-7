// frontend/js/components/bookForm.js
function showBookForm(book = null) {
  const modal = document.getElementById("modal");
  const titleEl = document.getElementById("form-title");

  document.getElementById("book-id").value = book ? book.id : "";
  document.getElementById("title").value = book ? book.title : "";
  document.getElementById("author").value = book ? book.author : "";
  document.getElementById("isbn").value = book ? book.isbn : "";

  titleEl.textContent = book ? "Edit Book" : "Add Book";
  modal.style.display = "flex";
}

function hideBookForm() {
  document.getElementById("modal").style.display = "none";
}
