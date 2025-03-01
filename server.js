const express = require("express")
const multer = require("multer")
const cors = require("cors")
const fs = require("fs")

const app = express()
const PORT = 2550

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.get('/start', (request, response) => {
    response.json({message:"Привет!"})
})

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
})