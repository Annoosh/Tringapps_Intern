const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user'
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Database connected successfully");
});

app.post('/user', (req, res) => {
  const { name, email, gender, address, courses, center, id } = req.body;
  const sql = "INSERT INTO form(id, name, email, gender, address, courses, center) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  db.query(sql, [id, name, email, gender, address, courses, center], (err, result) => {
    if (err) {
      console.error("Error in POST method:", err);
      return res.send(err);
    }
    return res.send(result);
  });
});

app.get('/users', (req, res) => {
  const sql = "SELECT * FROM form";
  
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error in GET method:", err);
      return res.send(err);
    }
    return res.send(rows);
  });
});

app.delete('/del/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM form WHERE id = ?";
  
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error("Error in DELETE method:", err);
      return res.send(err);
    }
    return res.send(result);
  });
});

app.put('/userupdate/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, gender, address, courses, center } = req.body;
  const sql = "UPDATE form SET name = ?, email = ?, gender = ?, address = ?, courses = ?, center = ? WHERE id = ?";
  
  db.query(sql, [name, email, gender, address, courses, center, id], (err, rows) => {
    if (err) {
      console.error("Error in PUT method:", err);
      return res.send(err);
    }
    return res.send(rows);
  });
});

app.delete('/del-all', (req, res) => {
  const sql = "DELETE FROM form";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error in DELETE ALL method:", err);
      return res.send(err);
    }
    return res.send(result);
  });
});

app.post('/del-selected', (req, res) => {
  const { ids } = req.body;
  const sql = "DELETE FROM form WHERE id IN (?)";
  
  db.query(sql, [ids], (err, result) => {
    if (err) {
      console.error("Error in DELETE SELECTED method:", err);
      return res.send(err);
    }
    return res.send(result);
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081...");
});
