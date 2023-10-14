const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const PORT = 5000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello from express")
}) 

app.listen(PORT, () => console.log(`server is up on ${PORT}`) )