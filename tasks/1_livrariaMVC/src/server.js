import 'dotenv/config'
import express from 'express'

import conn from "./config/conn.js"
import "./config/livroModel.js"

const PORT = process.env.PORT

const app = express()

app.get("/", (req, res) => {
    res.send("Olá, mundo!")
})

app.listen(PORT, () => {
    console.log("http://localhost:" + PORT)
})