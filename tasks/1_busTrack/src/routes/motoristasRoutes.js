import { Router } from "express";

import motoristasController from "../controllers/motoristas/motoristasController.js"

const router = Router()

router.post("/", (req, res) => {
    return motoristasController.createMotorista(req, res)
})

router.get("/", (req, res) => {
    return motoristasController.getMotoristas(req, res)
})

router.get("/:id", (req, res) => {
    return motoristasController.getMotorista(req, res)
})

router.delete("/:id", (req, res) => {
    return motoristasController.deleteMotorista(req, res)
})

export default router

