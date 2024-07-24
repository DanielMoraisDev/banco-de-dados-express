import { Router } from "express";

import onibusController from "../controllers/onibus/onibusController.js";

const router = Router();

router.post("/criar", (req, res) => {
  return onibusController.createOnibus(req, res);
});


export default router;
