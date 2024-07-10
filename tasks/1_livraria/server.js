import "dotenv/config"
import connectDB from "./db/conn.js"
import express from "express"
import { v4 as generateID } from "uuid"

const PORT = process.env.PORT

const app = express()

app.use(express())
connectDB()

app.get("/", (req, res) => {
    res.send("Olá, mundo!")
})

app.listen(PORT, () => {
    console.log("Servidor rodando na PORT:", PORT)
})

app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada"})
})