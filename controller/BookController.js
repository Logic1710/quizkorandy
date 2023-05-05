import Book from '../model/BookModel.js';

export const  createBookForm = (req, res) => {
    res.render('form')
}
export const create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        year_of_publish : req.body.year_of_publish,
        page_number : req.body.page_number,
        synopsis : req.body.synopsis,
        genre : req.body.genre,
        type : req.body.type,
        cover : req.body.cover
    });

    Book.create(book, (error, data) => {
        if (error) {
            res.status(500).send({
                message:
                    error.message || 'Some error occurred while creating the book.'
            });
        } else {
            res.send(data);
        }
    });
};

export const findAll = (req, res) => {
    Book.getAll((error, data) => {
        if (error) {
            res.status(500).send({
                message:
                    error.message || 'Some error occurred while retrieving books.'
            });
        } else {
            res.render('catalog', { data })
        }
    });
};

export const findOne = (req, res) => {
    const bookid = req.query.id;
    Book.findById(bookid, (error, data) => {
        if (error) {
            if (error.message === 'Book not found.') {
                res.status(404).send({
                    message: error.message
                });
            } else {
                res.status(500).send({
                    message:
                        error.message || 'Some error occurred while retrieving the book.'
                });
            }
        } else {
            res.render('book',  {data} )
        }
    });
};