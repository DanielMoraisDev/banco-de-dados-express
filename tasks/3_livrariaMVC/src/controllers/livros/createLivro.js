import { v4 as generateID } from "uuid";
import conn from "../../config/conn.js";

const createLivro = (req, res) => {
  const { titulo, autor, ano_publicacao, genero } = req.body;

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
        WHERE ?? = ? AND
        ?? = ? AND
        ?? = ?
    `;

  const checkSqlData = [
    "titulo",
    titulo,
    "autor",
    autor,
    "ano_publicacao",
    ano_publicacao,
  ];

  conn.query(checkSql, checkSqlData, (err, data) => {
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
        (??, ??, ??, ??, ??, ??)
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
            )
        `;

    const insertSqlData = [
      "livro_id",
      "titulo",
      "autor",
      "ano_publicacao",
      "genero",
      "disponibilidade",
      id,
      titulo,
      autor,
      ano_publicacao,
      genero,
      disponibilidade
    ];

    conn.query(insertSql, insertSqlData, (err, data) => {
      if (err) {
        res.status(500).json({ message: "Error ao cadastrar os livros" });
        return console.log("[LIVROS POST FAIL] " + err);
      }

      res.status(201).json({ message: "Livro cadastrado" });
    });
  });
};

export default createLivro;
