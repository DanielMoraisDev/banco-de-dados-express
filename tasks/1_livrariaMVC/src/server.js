import "dotenv/config";
import express from "express";

import livrosRouter from "./routes/livroRoutes.js";

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
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

app.use("/livros", livrosRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
