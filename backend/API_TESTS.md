# API Tests

## 1. Get All Books
```bash
curl http://localhost:3000/api/books

## 2. Get Book by ID
curl http://localhost:3000/api/books/1

## 3. Create Book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
  }'

## 4. Borrow Book
curl -X PATCH http://localhost:3000/api/books/1/borrow

## 5. Return Book
curl -X PATCH http://localhost:3000/api/books/1/return

## 6. Delete Book
curl -X DELETE http://localhost:3000/api/books/1
