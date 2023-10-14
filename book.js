// const client = require('./connection.js')
const express = require('express')
const bodyParser = require("body-parser");
const dotenv = require('dotenv')
const {Client} = require('pg')
dotenv.config()

const app = express()
app.use(bodyParser.json());



const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 3000,
    password: "200218",
    database: "books"
})



client.connect();

app.get('/books', (req, res)=>{
    client.query(`Select * from books`, (error, result)=>{
        if(error){
            return res.send({error})
        }else{
            res.send(result.rows);
        }
    });
    client.end;
})
// client.connect();
app.get('/books/:id', (req, res)=>{
    client.query(`Select * from books where id=${req.params.id}`, (error, result)=>{
        if(error){
            return res.send({error})
        }else{
            res.send(result.rows);
        }
    });
    client.end;
})
// client.connect();
app.post('/books', (req, res)=> {
    const book = req.body;
    let insertQuery = `insert into books(id, bookTitle, author, genre, publishedDate, rating) 
                       values(${book.id}, '${book.bookTitle}', '${book.author}', '${book.genre}', '${book.publishedDate}', '${book.rating}')`

    client.query(insertQuery, (error, result)=>{
        if(!error){
            res.send('Inserted Successfully!')
        }
        else{ console.log(error.message) }
    })
    client.end;
})
app.put('/books/:id', (req, res)=> {
    let book = req.body;
    let updateQuery = `update books
                       set bookTitle = '${book.bookTitle}',
                       author = '${book.author}',
                       genre = '${book.genre}',
                       publishedDate = '${book.publishedDate}',
                       rating = '${book.rating}'
                       where id = ${book.id}`

    client.query(updateQuery, (error, result)=>{
        if(!error){
            res.send('Update was successful')
        }
        else{ console.log(error.message) }
    })
    client.end;
})
app.delete('/books/:id', (req, res)=> {
    let insertQuery = `delete from books where id=${req.params.id}`

    client.query(insertQuery, (error, result)=>{
        if(!error){
            res.send('Successfully deleted!')
        }
        else{ console.log(error.message) }
    })
    client.end;
})


app.listen(3000, () => {
    console.log("The server is up on port 3000")
 })