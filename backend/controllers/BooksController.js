const pool = require('../configs/db');

function BooksController() {}
 
const getQuery = `
SELECT 
  b.id as id, 
  b.title as title, 
  b.releaseDate as releaseDate, 
  b.description as description, 
  b.pages as pages,
  b.createdAt as createdAt, 
  b.updatedAt as updatedAt, 
  a.id as authorId, 
  a.name as name, 
  a.birthday as birthday, 
  a.bio as bio
FROM book b 
INNER JOIN author a ON b.authorId = a.id
`;

// GET ALL BOOKS
BooksController.prototype.get = async (req, res) => {
  try {
    const books = await pool.query(getQuery);

    const formatted = books.map(book => ({
      ...book,
      releaseDate: new Date(book.releaseDate).toLocaleDateString("en-CA"),
      createdAt: new Date(book.createdAt).toLocaleDateString("en-CA"),
      updatedAt: new Date(book.updatedAt).toLocaleDateString("en-CA")
    }));

    return res.status(200).json({ books: formatted });

  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      message: "Something unexpected has happened. Please try again later.",
    });
  }
};

// CREATE BOOK
BooksController.prototype.create = async (req, res) => {
  try {
    const { title, description, releaseDate, pages, author: authorId } = req.body;

    await pool.query(
      `INSERT INTO book 
        (title, releaseDate, description, pages, authorId, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [title, new Date(releaseDate), description, pages, authorId]
    );

    const books = await pool.query(getQuery);

    return res.status(200).json({
      message: "Book created successfully!",
      books
    });

  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({
      message: "Something unexpected has happened. Please try again later.",
    });
  }
};

// UPDATE BOOK
BooksController.prototype.update = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, description, releaseDate, pages, author: authorId } = req.body;

    await pool.query(
      `UPDATE book 
       SET title = ?, releaseDate = ?, description = ?, pages = ?, authorId = ?, updatedAt = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [title, new Date(releaseDate), description, pages, authorId, bookId]
    );

    const books = await pool.query(getQuery);

    return res.status(200).json({
      message: "Book updated successfully!",
      books
    });

  } catch (error) {
    co
