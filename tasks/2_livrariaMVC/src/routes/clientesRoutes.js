import { Router } from "express"

import clientesController from "../controllers/clientes/clientesController.js"

const router = Router()

router.get("/", (req, res) => {
    return clientesController.getClientes(req, res)
})

router.post("/criar", (req, res) => {
    return clientesController.createCliente(req, res)
})

router.get("/buscar/:id", (req, res) => {
    return clientesController.getCliente(req, res)
})

router.put("/atualizar/:id", (req, res) => {
    return clientesController.updateCliente(req, res)
})

router.delete("/deletar/:id", (req, res) => {
    return clientesController.deleteCliente(req, res)
})

export default router