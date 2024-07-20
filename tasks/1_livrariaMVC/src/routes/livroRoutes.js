import { Router } from "express"

import livrosController from "../controllers/livros/livrosController.js"

const router = Router()

router.get("/", (req, res) => {
    return livrosController.getLivros(req, res)
})

router.post("/criar", (req, res) => {
    return livrosController.createLivro(req, res)
})

router.get("/buscar/:id", (req, res) => {
    return livrosController.getLivro(req, res)
})

router.put("/atualizar/:id", (req, res) => {
    return livrosController.updateLivro(req, res)
})

router.delete("/deletar/:id", (req, res) => {
    return livrosController.deleteLivro(req, res)
})

export default router