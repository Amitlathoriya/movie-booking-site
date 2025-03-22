import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import adminRoutes from './admin.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'amy_infinite',
  password: '2343',
  database: 'yourdatabase',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0) {
      res.status(200).send({ success: true });
    } else {
      res.status(401).send({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length > 0) {
      return res.status(400).send({ success: false, message: 'Email already exists' });
    }

    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(insertQuery, [email, password], (err) => {
      if (err) return res.status(500).send('Server error');
      res.status(201).send({ success: true, message: 'User registered successfully' });
    });
  });
});

// Use admin routes
app.use('/api', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});