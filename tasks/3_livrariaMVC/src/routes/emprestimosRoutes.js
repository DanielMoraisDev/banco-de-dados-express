import { Router } from "express"

import emprestimosController from "../controllers/emprestimos/emprestimosController.js"

const router = Router()

router.get("/", (req, res) => {
    return emprestimosController.getEmprestimos(req, res)
})

router.post("/criar", (req, res) => {
    return emprestimosController.createEmprestimo(req, res)
})

router.get("/buscar/:id", (req, res) => {
    return emprestimosController.getEmprestimo(req, res)
})

router.put("/atualizar/:id", (req, res) => {
    return emprestimosController.updateEmprestimo(req, res)
})

router.delete("/deletar/:id", (req, res) => {
    return emprestimosController.deleteEmprestimo(req, res)
})

export default router