const express = require("express");
const PORT = 8080 || 3030;

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  try {
    const { nome, idade } = req.query;

    if (!nome || !idade) {
      res.status(500).json({ message: "Ausente de dados" });
    }

    res.send({ message: {nome, idade} });
  } catch (error) {
    console.log("[USERS GET FAIL] Error: " + error);
  }
});

app.post("/users", (req, res) => {
  try {
    const user = {
      nome: req.body.nome,
      idade: req.body.idade,
    };

    if (!user.nome || !user.idade) {
      res.status(500).json({ message: "Ausente de dados" });
    }

    res.status(201).json({ message: user });
  } catch (error) {
    console.log("[USERS POST FAIL] Error: " + error);
  }
});

app.delete("/users", (req, res) => {
  res.status(204).json({ message: "DELETE" });
});

app.patch("/users", (req, res) => {
  res.status(200).json({ message: "PATCH" });
});

app.put("/users/:id/:cpf", (req, res) => {
  const { id, cpf } = req.params;

  res.json({ message: ["João Gomes", "José Camoes", "Adelia De Jesus"] });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
