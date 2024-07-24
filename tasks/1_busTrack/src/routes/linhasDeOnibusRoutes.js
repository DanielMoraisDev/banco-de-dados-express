import { Router } from "express";

import linhasDeOnibusController from "../controllers/linhas_de_onibus/linhasDeOnibusController.js"

const router = Router()

router.post("/criar", (req, res) => {
    return linhasDeOnibusController.createLinhaDeOnibus(req, res)
})

router.get("/", (req, res) => {
    return linhasDeOnibusController.getLinhasDeOnibus(req, res)
})

router.get("/:id", (req, res) => {
    return linhasDeOnibusController.getLinhaDeOnibus(req, res)
})

export default router

