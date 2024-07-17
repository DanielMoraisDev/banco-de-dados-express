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
      return console.log("[LIVROS GET FAIL]" + err);
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
        res.status(500).json({ message: "Error ao cadastrar os livros" });
        return console.log("[LIVROS POST FAIL] " + err);
      }

      res.status(201).json({ message: "Livro cadastrado" });
    });
  });
});

app.get("/livros/:id", (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `
  SELECT * FROM livros 
  WHERE id = "${id}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar livro" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    res.json({ message: "Livro encontrado", data });
  });
});

app.put("/livros/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano_publicacao, genero, preco, disponibilidade } =
    req.body;

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

  if (!disponibilidade) {
    res.status(500).send({ message: "A disponibilidade é obrigatória" });
    return;
  }

  const sql = /*sql*/ `
  SELECT * FROM livros 
  WHERE id = "${id}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar livro" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Livro não encontrado" });
      return;
    }

    const updateSql = /*sql*/ `
      UPDATE livros 
      SET titulo = "${titulo}",
      autor = "${autor}",
      ano_publicacao = "${ano_publicacao}",
      genero = "${genero}",
      preco = "${preco}", 
      disponibilidade = "${disponibilidade}"
      WHERE id = "${id}"
    `;

    conn.query(updateSql, (err) => {
      if (err) {
        console.log("[LIVROS PUT FAIL] " + err);
        res.status(500).json({ message: "Erro ao atualizar livro" });
        return;
      }

      res.json({ message: "Livro atualizado" });
    });
  });
});

app.delete("/livros/:id", (req, res) => {
  const { id } = req.params;

  const deleteSql = /*sql*/ `
    DELETE FROM livros
    WHERE id = "${id}"
  `;

  conn.query(deleteSql, (err) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar livro" });
      return;
    }

    res.json({ message: "Livro foi deletado" });
  });
});

app.get("/funcionarios", (req, res) => {
  const sql = "SELECT * FROM funcionarios";

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar os funcionarios" });
      return console.log("[FUNCIONARIO GET FAIL]" + err);
    }

    const livros = data;
    console.log(typeof livros);
    res.json({ message: sendNameRoutes(req, res), livros });
  });
});

app.post("/funcionarios", (req, res) => {
  const { nome, cargo, data_contratacao, email, salario } = req.body;

  if (!nome) {
    res.status(500).send({ message: "O nome é obrigatório" });
    return;
  }

  if (!cargo) {
    res.status(500).send({ message: "O cargo é obrigatório" });
    return;
  }

  if (!data_contratacao) {
    res.status(500).send({ message: "O data de contratação é obrigatório" });
    return;
  }

  if (!email) {
    res.status(500).send({ message: "O email é obrigatório" });
    return;
  }

  if (!salario) {
    res.status(500).send({ message: "O salário é obrigatório" });
    return;
  }

  const checkSql = /*sql*/ `
        SELECT * FROM funcionarios
        WHERE email = "${email}"
    `;

  conn.query(checkSql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar o funcionario" });
      return console.log("[FUNCIONARIOS POST FAIL] " + err);
    }

    if (data.length > 0) {
      res.status(500).json({ message: "Funcionário já existente" });
      return console.log("[FUNCIONARIOS POST FAIL] " + err);
    }

    const id = generateID();

    const insertSql = /*sql*/ `
        INSERT INTO funcionarios 
        (id, nome, cargo, data_contratacao, email, salario)
        VALUES (
            "${id}",
            "${nome}",
            "${cargo}",
            "${data_contratacao}",
            "${email}",
            "${salario}"
            )
        `;

    conn.query(insertSql, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Error ao cadastrar o funcionario" });
        return console.log("[FUNCIONARIOS POST FAIL] " + err);
      }

      res.status(201).json({ message: "Funcionario cadastrado" });
    });
  });
});

app.get("/funcionarios/:id", (req, res) => {
  const { id } = req.params;

  const sql = /*sql*/ `
  SELECT * FROM funcionarios 
  WHERE id = "${id}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar funcionarios" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Funcionario não encontrado" });
      return;
    }

    res.json({ message: "Funcionario encontrado", data });
  });
});

app.put("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, cargo, data_contratacao, email, salario } = req.body;

  if (!nome) {
    res.status(500).send({ message: "O nome é obrigatório" });
    return;
  }

  if (!cargo) {
    res.status(500).send({ message: "O cargo é obrigatório" });
    return;
  }

  if (!data_contratacao) {
    res.status(500).send({ message: "O data de contratação é obrigatório" });
    return;
  }

  if (!email) {
    res.status(500).send({ message: "O email é obrigatório" });
    return;
  }

  if (!salario) {
    res.status(500).send({ message: "O salário é obrigatório" });
    return;
  }

  const sql = /*sql*/ `
    SELECT * FROM funcionarios 
    WHERE id = "${id}" AND email != "${email}"
  `;

  conn.query(sql, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro ao buscar funcionario" });
      return;
    }

    if (data.length === 0) {
      res.status(404).json({ message: "Funcionario não encontrado ou o email já está cadastrado" });
      return;
    }

    const updateSql = /*sql*/ `
    UPDATE funcionarios 
    SET nome = "${nome}",
    cargo = "${cargo}",
    email = "${email}",
    salario = "${salario}"
    WHERE id = "${id}"
  `;

    conn.query(updateSql, (err) => {
      if (err) {
        console.log("[LIVROS PUT FAIL] " + err);
        res.status(500).json({ message: "Erro ao atualizar funcionario" });
      }

      res.json({ message: "Funcionario atualizado" });
    });
  });
});

app.delete("/funcionarios/:id", (req, res) => {
  const { id } = req.params;

  const deleteSql = /*sql*/ `
    DELETE FROM funcionarios
    WHERE id = "${id}"
  `;

  conn.query(deleteSql, (err) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar funcionario" });
      return;
    }

    res.json({ message: "Funcionario foi deletado" });
  });
});

app.listen(PORT, () => {
  console.log("Servidor rodando na PORT:", PORT);
});

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});
