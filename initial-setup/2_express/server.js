const express = require('express')
const PORT = 8080 || 3030

const app = express()

app.get("/users", (req, res) => {
    res.json({ message: [
        "João Gomes",
        "José Camoes",
        "Adelia De Jesus"
    ]})
})

app.post("/users", (req, res) => {
    res.status(201).json({ message: "POST"})
})

app.delete("/users", (req, res) => {
    res.status(204).json({ message: "DELETE"})
})

app.patch("/users", (req, res) => {
    res.status(200).json({ message: "PATCH"})
})

app.put("/users", (req, res) => {
    res.json({ message: [
        "João Gomes",
        "José Camoes",
        "Adelia De Jesus"
    ]})
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})