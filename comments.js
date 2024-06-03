// Create web server
const express = require('express');
const app = express();
app.use(express.static('public'));

// Connect to database
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'comment';
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);
  app.listen(3000, () => {
    console.log('MongoDB server is running on http://localhost:3000');
  });
});

// Create a collection
app.get('/create', (req, res) => {
  db.createCollection('comment', (err, collection) => {
    if (err) throw err;
    console.log('Collection created!');
    res.send('Collection created!');
  });
});

// Insert data
app.get('/insert', (req, res) => {
  const data = { name: 'John', message: 'Hello MongoDB' };
  db.collection('comment').insertOne(data, (err, collection) => {
    if (err) throw err;
    console.log('Record inserted successfully');
    res.send('Record inserted successfully');
  });
});

// Fetch all data
app.get('/read', (req, res) => {
  db.collection('comment').find().toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Update data
app.get('/update', (req, res) => {
  const query = { name: 'John' };
  const data = { $set: { message: 'Hello Node.js' } };
  db.collection('comment').updateOne(query, data, (err, collection) => {
    if (err) throw err;
    console.log('Record updated successfully');
    res.send('Record updated successfully');
  });
});

// Delete data
app.get('/delete', (req, res) => {
  const query = { name: 'John' };
  db.collection('comment').deleteOne(query, (err, collection) => {
    if (err) throw err;
    console.log('Record deleted successfully');
    res.send('Record deleted successfully');
  });
});