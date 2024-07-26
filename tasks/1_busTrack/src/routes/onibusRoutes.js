import { Router } from "express";

import onibusController from "../controllers/onibus/onibusController.js";

const router = Router();

router.post("/", (req, res) => {
  return onibusController.createOnibus(req, res);
});

router.get("/:id", (req, res) => {
  return onibusController.getOnibus(req, res);
});

router.get("/", (req, res) => {
  return onibusController.getAllOnibus(req, res);
});

export default router;