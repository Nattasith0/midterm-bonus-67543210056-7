// frontend/js/api.js
class LibraryAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(path, options = {}) {
    const res = await fetch(`${this.baseURL}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });

    let json;
    try {
      json = await res.json();
    } catch {
      throw new Error(`Invalid JSON response (HTTP ${res.status})`);
    }

    if (!res.ok || json.success === false) {
      throw new Error(json.error || json.message || `HTTP ${res.status}`);
    }

    return json; // { success, data, timestamp }
  }

  async getAllBooks(status = null) {
    const q = status ? `?status=${encodeURIComponent(status)}` : "";
    const json = await this.request(`/books${q}`);
    return json.data;
  }

  async createBook(bookData) {
    const json = await this.request(`/books`, {
      method: "POST",
      body: JSON.stringify(bookData),
    });
    return json.data;
  }

  async updateBook(id, bookData) {
    const json = await this.request(`/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(bookData),
    });
    return json.data;
  }

  async borrowBook(id) {
    const json = await this.request(`/books/${id}/borrow`, { method: "PATCH" });
    return json.data;
  }

  async returnBook(id) {
    const json = await this.request(`/books/${id}/return`, { method: "PATCH" });
    return json.data;
  }

  async deleteBook(id) {
    const json = await this.request(`/books/${id}`, { method: "DELETE" });
    return json.data;
  }
}

// Export for other files
const api = new LibraryAPI("http://192.168.56.101:3000/api");
