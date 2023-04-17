const express = require('express');
const fs = require('fs');

const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// postman
app.use(express.json());

app.use(express.urlencoded());

function demo(req, res, next) {
    console.log('Hi I am middleware');

    return next();
}

// database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345123',
    database: 'StudentInfo'
});

connection.connect((err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log('Database connected successfully');
    }
})

app.post('/api', (req, res) => {
    const id = req.body.ID;
    const name = req.body.StudentName;
    const mobile = req.body.Mobile;
    const address = req.body.address;
    const city = req.body.city;

    const query = `INSERT INTO StudentInfo (ID, StudentName, Mobile, Address, City)
    VALUES (${id}, '${name}', '${mobile}', '${address}', '${city}')`;

    console.log(query);

    connection.query(query, (err, data) => {
        if(err) {
            res.send(`Error: ${err}`);
        } else {
            res.send('Data saved');
        }
    });
});

app.get('/api', (req, res) => {
    const query = 'select * from StudentInfo';
    connection.query(query, (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(`Error: ${err}`);
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

app.get('/api/:id', (req, res) => {
    const id = req.params.id;
    const query = `Select * from StudentInfo where id = ${id}`;
    connection.query(query, (err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(`Error: ${err}`);
        } else {
            console.log(data);
            res.send(data);
        }
    })
});

app.put('/api/:id', (req, res) => {
    const id = req.params.id;   
    const query = `
    UPDATE StudentInfo
    SET City = 'Alfred Schmidt'
    WHERE ID = ${id};
    `
    connection.query(query, (err, data) => {
        if (err) {
            res.send(`Error: ${err}`);
        } else {
            res.send('Record Update');
        }
    });
});

app.delete('/api/:id', (req, res) => {
    const myName = req.params.id;
    const myQuery = `DELETE FROM StudentInfo WHERE id = ${myName}`;
    connection.query(myQuery, (err,data) =>{
        if(err){
            res.send(`Error: ${err}`)
        }else{
            res.send(data)
        }
    });
});

app.post('/api/file', (req,res) =>{
    const data = req.body.essay;
    fs.writeFileSync('essay.txt', data);
    res.send('your essay is saved');
});

app.get('/api/essay/file', demo, (req,res) =>{
    const data = fs.readFileSync('essay.txt');
    res.send(data);
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`listening the: ${port}`);
});
