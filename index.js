const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.post('/api', (req,res) =>{
    res.send('post request');
});

app.get('/api', (req,res) =>{
    res.send('This is my get req');
});

app.get('/api/:id', (req,res) =>{
    const myName = req.params.id;
    res.send(`Get req for ${myName}`)
});

app.put('/api/:id', (req,res) =>{
    const myName = req.params.id;
    res.send(`ubdate req for id ${myName}`);
});

app.delete('/api/:id', (req,res) =>{
    const myName = req.params.id;
    res.send(`delete req for id ${myName}`);
});
app.listen(port,() =>{
    console.log(`listening the: ${port}`);
});
