const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'mysql-loan-application-backupcredita-5ebc.g.aivencloud.com', // replace with your MySQL host
    user: 'avnadmin', // replace with your MySQL username
    password: 'AVNS_imXagB_IpbsjzLVeOfc', // replace with your MySQL password
    database: 'backend_contacts', // the database we created
    port:19594,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle form submission
app.post('/apply', (req, res) => {
    const { name, email, phone, employed, message } = req.body;

    const query = `INSERT INTO applications (name, email, phone, interest, message) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, email, phone, employed, message];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Server error' });
        } else {
            res.status(200).json({ message: 'Form submission successful' });
        }
    });
});

// Start the server
const PORT = 3000; // or any other port you'd like
app.listen(PORT, () => {
    console.log(`Server is running on port ${19594}`);
});
