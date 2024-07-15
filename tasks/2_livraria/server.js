import mysql from "mysql2";
import "dotenv/config";
import { connectDB, conn } from "./db/conn.js";
import express from "express";
import { v4 as generateID } from "uuid";

const PORT = process.env.PORT;

const app = express();

const logRoutes = (req, res, next) => {
  const { url, method } = req;
  const rota = `[${method.toUpperCase()}] ${url}`;
  console.log(rota);
  next();
};

const sendNameRoutes = (req, res) => {
  const { url, method } = req;
  const nameRoute = `[${method}] ${url}`;
  return nameRoute;
};

app.use(express.json());
app.use(logRoutes);
connectDB();

app.get("/", (req, res) => {
  res.json({ message: sendNameRoutes(req, res) });
});

app.get("/livros", (req, res) => {
  const sql = "SELECT * FROM livros";

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os livros" });
      return console.log("[LIVROS POST FAIL]" + err);
    }

    const livros = data;
    console.log(typeof livros);
    res.json({ message: sendNameRoutes(req, res), livros });
  });
});

app.post("/livros", (req, res) => {
  const { titulo, autor, ano_publicacao, genero, preco } = req.body;

  if (!titulo) {
    res.status(500).send({ message: "O título é obrigatório" });
    return;
  }

  if (!autor) {
    res.status(500).send({ message: "O autor é obrigatório" });
    return;
  }

  if (!ano_publicacao) {
    res.status(500).send({ message: "O ano de publicação é obrigatório" });
    return;
  }

  if (!genero) {
    res.status(500).send({ message: "O genêro é obrigatório" });
    return;
  }

  if (!preco) {
    res.status(500).send({ message: "O preço é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
        SELECT * FROM livros
        WHERE titulo = "${titulo}" AND
        autor = "${autor}" AND
        ano_publicacao = "${ano_publicacao}"
    `;

  conn.query(checkSql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o livro" });
      return console.log("[LIVROS POST FAIL] " + err);
    }

    if (data.length > 0) {
      res.status(500).json({ message: "Livro já existente" });
      return console.log("[LIVROS POST FAIL] " + err);
    }

    const id = generateID();
    const disponibilidade = 1;

    const insertSql = /*sql*/ `
        INSERT INTO livros 
        (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
        VALUES (
            "${id}",
            "${titulo}",
            "${autor}",
            "${ano_publicacao}",
            "${genero}",
            "${preco}",
            "${disponibilidade}"
            )
        `;

    conn.query(insertSql, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Error ao cadastrar os livros" })
            return console.log("[LIVROS POST FAIL] " + err)
        }

        res.status(201).json({ message: "Livro cadastrado" })
    })

    res.json({ message: sendNameRoutes(req, res) });
  });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na PORT:", PORT);
});

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});
