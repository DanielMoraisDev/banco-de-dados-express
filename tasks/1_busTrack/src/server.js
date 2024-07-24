import "dotenv/config";
import express from "express";

import linhasDeOnibusRoutes from "./routes/linhasDeOnibusRoutes.js";
import motoristasRoutes from "./routes/motoristasRoutes.js";
import onibusRoutes from "./routes/onibusRoutes.js";

const PORT = process.env.PORT;

const app = express();

const logRoutes = (req, res, next) => {
  const { url, method } = req;
  const rota = `[${method.toUpperCase()}] ${url}`;
  console.log(rota);
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRoutes);

app.use("/linhas_de_onibus", linhasDeOnibusRoutes);
app.use("/motoristas", motoristasRoutes);
app.use("/onibus", onibusRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});
