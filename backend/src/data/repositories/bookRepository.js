const db = require("../database/db");

function list(status) {
    return new Promise((resolve, reject) => {
        const where = status ? "WHERE status = ?" : "";
        const params = status ? [status] : [];
        db.all(`SELECT * FROM books ${where} ORDER BY id DESC`, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

function create({ title, author, isbn }) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO books (title, author, isbn, status) VALUES (?, ?, ?, 'available')`,
            [title, author, isbn],
            function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            }
        );
    });
}

function update(id, { title, author, isbn }) {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?`,
            [title, author, isbn, id],
            function (err) {
                if (err) return reject(err);
                resolve({ changes: this.changes });
            }
        );
    });
}

function updateStatus(id, status) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE books SET status = ? WHERE id = ?`, [status, id], function (err) {
            if (err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM books WHERE id = ?`, [id], function (err) {
            if (err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
}

module.exports = { list, findById, create, update, updateStatus, remove };
