import express from 'express';
import mysql from 'mysql';

const router = express.Router();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'amy_infinite',
  password: '2343',
  database: 'yourdatabase',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Fetch all movies
router.get('/movies', (req, res) => {
  const query = 'SELECT * FROM movies';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).send(results);
  });
});

// Add a new movie
router.post('/movies', (req, res) => {
  console.log('POST /movies request received:', req.body); // Log incoming request
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send('Name and price are required.');
  }

  const query = 'INSERT INTO movies (name, price) VALUES (?, ?)';
  db.query(query, [name, price], (err, result) => {
    if (err) {
      console.error('Error inserting movie into database:', err); // Log error
      return res.status(500).send('Server error');
    }
    res.status(201).send({ id: result.insertId, name, price });
  });
});

// Remove a movie
router.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM movies WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).send({ success: true });
  });
});

export default router;
