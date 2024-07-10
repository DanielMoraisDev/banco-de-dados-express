const express = require("express");
const app = express();
const { v4 } = require('uuid')

const PORT = 8080 || 3030;

const users = []

app.use(express.json());

const logRoutes = (req, res, next) => {
    const { url, method } = req
    const rota = `[${method.toUpperCase()}] ${url}`
    console.log(rota)
    next()
}

app.use(logRoutes)

app.get("/users", (req, res) => {
    try {
        const { nome, idade } = req.query;

        if (!nome) {
            res.status(500).json({ message: "O nome é obrigatório" });
            return 
        }
    
        if (!idade) {
            res.status(500).json({ message: "A idade é obrigatório" });
            return 
        }

        res.send({ message: { nome, idade } });
    } catch (error) {
        console.log("[USERS GET FAIL] Error: " + error);
    }
});

app.post("/users", (req, res) => {
  try {
    const user = {
        id: v4(),
        nome: req.body.nome,
        idade: req.body.idade,
    }

    if (!user.nome || !user.idade) {
      res.status(500).json({ message: "Ausente de dados" });
      return 
    }

    users.push(user)
    res.status(201).json({ message: user });
  } catch (error) {
    console.log("[USERS POST FAIL] Error: " + error);
  }
});

app.delete("/users/:id", (req, res) => {
    try {
        const id = req.params.id
        
        const indexUser = users.findIndex((user) => user.id == id)

        if (indexUser == -1) {
            res.status(500).json({ message: "Usuário não encontrado" });
            return
        }

        users.splice(indexUser, 1)

        res.status(204).json({ message: "Usuário atualizado " });

    } catch (error) {
        console.log("[USERS DELETE FAIL] Error: " + error);
    }
});

app.patch("/users", (req, res) => {
  res.status(200).json({ message: "PATCH" });
});

app.put("/users/:id", (req, res) => {
    try {
        const { id } = req.params

        const indexUser = users.findIndex( e => e.id == id)

        if (indexUser == -1) {
            res.status(500).json({ message: "Usuário não encontrado" });
            return
        }

        const userUpdate = {
            nome: req.body.nome,
            idade: req.body.idade,
        }

        if (!userUpdate.nome || !userUpdate.idade) {
          res.status(500).json({ message: "Ausente de dados" });
          return
        }

        res.json({ message: userUpdate });
      } catch (error) {
        console.log("[USERS PUT FAIL] Error: " + error);
      }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta: " + PORT);
});
