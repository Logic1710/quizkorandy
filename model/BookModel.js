import conn from "../dbconnect.js";
const Book = function(book) {
    this.title = book.title;
    this.author = book.author;
    this.year_of_publish = book.year_of_publish;
    this.page_number = book.page_number;
    this.synopsis = book.synopsis;
    this.genre = book.genre;
    this.type = book.type;
    this.cover = book.cover
};

Book.create = (newBook, result) => {
    conn.query('INSERT INTO books SET ?', newBook, (error, res) => {
        if (error) {
            console.log('Error:', error);
            result(error, null);
            return;
        }

        console.log('Created book:', { id: res.insertId, ...newBook });
        result(null, { id: res.insertId, ...newBook });
    });
};

Book.getAll = result => {
    conn.query('SELECT * FROM books', (error, res) => {
        if (error) {
            console.log('Error:', error);
            result(error, null);
            return;
        }

        console.log('Books:', res);
        result(null, res);
    });
};

Book.findById = (id, result) => {
    conn.query('SELECT * FROM books WHERE id = ?', id, (error, res) => {
        if (error) {
            console.log('Error:', error);
            result(error, null);
            return;
        }

        if (res.length) {
            console.log('Book:', res[0]);
            result(null, res[0]);
            return;
        }

        result({ message: 'Book not found.' }, null);
    });
};

export default Book;