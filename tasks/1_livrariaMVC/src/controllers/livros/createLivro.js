import { v4 as generateID } from "uuid"
import conn from "../../config/conn.js"

const createLivro = (req, res) => {
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
        (id, titulo, autor, ano_publicacao, genero, disponibilidade)
        VALUES (
            "${id}",
            "${titulo}",
            "${autor}",
            "${ano_publicacao}",
            "${genero}",
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
}

export default createLivro;