const express = require('express')
const PORT = 8080 || 3030

const app = express()

app.get("/users", (req, res) => {
    res.json({ message: "GET"})
})

app.post("/users", (req, res) => {
    res.status(201).json({ message: "POST"})
})

app.delete("/users", (req, res) => {
    res.status(204).json({ message: "DELETE"})
})



app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})