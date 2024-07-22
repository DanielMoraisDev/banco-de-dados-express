import { Router } from "express"

import funcionariosController from "../controllers/funcionarios/funcionariosController.js"

const router = Router()

router.get("/", (req, res) => {
    return funcionariosController.getFuncionarios(req, res)
})

router.post("/criar", (req, res) => {
    return funcionariosController.createFuncionario(req, res)
})

router.get("/buscar/:id", (req, res) => {
    return funcionariosController.getFuncionario(req, res)
})

router.put("/atualizar/:id", (req, res) => {
    return funcionariosController.updateFuncionario(req, res)
})

router.delete("/deletar/:id", (req, res) => {
    return funcionariosController.deleteFuncionario(req, res)
})

export default router