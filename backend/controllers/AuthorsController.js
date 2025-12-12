const pool = require('../configs/db');

function AuthorsController() {}

const getQuery = 'SELECT * FROM author';

// GET ALL AUTHORS
AuthorsController.prototype.get = async (req, res) => {
  try {
    const authors = await pool.query(getQuery);

    const formatted = authors.map(author => ({
      ...author,
      birthday: new Date(author.birthday).toLocaleDateString("en-CA"),
      createdAt: new Date(author.createdAt).toLocaleDateString("en-CA"),
      updatedAt: new Date(author.updatedAt).toLocaleDateString("en-CA")
    }));

    res.status(200).json({ authors: formatted });

  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({
      message: "Something unexpected has happened. Please try again later.",
    });
  }
};

// CREATE AUTHOR
AuthorsController.prototype.create = async (req, res) => {
  try {
    const { name, birthday, bio } = req.body;

    await pool.query(
      'INSERT INTO author (name, birthday, bio, createdAt, updatedAt) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [name, new Date(birthday), bio]
    );

    const authors = await pool.query(getQuery);

    res.status(200).json({
      message: "Author created successfully!",
      authors
    });

  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({
      message: "Something unexpected has happened. Please try again later.",
    });
  }
};

// UPDATE AUTHOR
AuthorsController.prototype.update = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { name, birthday, bio } = req.body;

    await pool.query(
      `UPDATE author 
       SET name = ?, birthday = ?, bio = ?, updatedAt = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name, new Date(birthday), bio, authorId]
    );

    const authors = await pool.query(getQuery);

    res.status(200).json({
      message: "Author updated successfully!",
      authors
    });

  } catch (error) {
    console.error("Error updating author:", error);
    res.status(500).json({
      message: "Something unexpected has happened. Please try again later.",
    });
  }
};

// DELETE AUTHOR
AuthorsController.prototype.delete = async (req, res) => {
  try {
    const authorId = req.params.id;

    await pool.query('DELETE FROM author WHERE id = ?', [authorId]);

    const authors = await pool.query(getQuery);

    res.status(200).json({
      message: "Author deleted successfully!",
      authors,
    });

  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({
      message: "Something unexpected has happened. Please try again later.",
    });
  }
};

module.exports = new AuthorsController();
