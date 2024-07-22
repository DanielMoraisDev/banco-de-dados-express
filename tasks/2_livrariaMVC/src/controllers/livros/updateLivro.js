import conn from "../../config/conn.js";

const updateLivro = (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano_publicacao, genero, disponibilidade } = req.body;

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

  if (!disponibilidade) {
    res.status(500).send({ message: "A disponibilidade é obrigatória" });
    return;
  }

  const sql = /*sql*/ `
  SELECT * FROM livros 
  WHERE ?? = ?
  `;

  const sqlData = ["livro_id", id];

  conn.query(sql, sqlData, (err, data) => {
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
      SET ?? = ?,
      ?? = ?,
      ?? = ?,
      ?? = ?,
      ?? = ?
      WHERE ?? = ?
    `;

    const updateSqlData = [
      "titulo",
      titulo,
      "autor",
      autor,
      "ano_publicacao",
      ano_publicacao,
      "genero",
      genero,
      "disponibilidade",
      disponibilidade,
      "livro_id",
      id
    ];

    conn.query(updateSql, updateSqlData, (err) => {
      if (err) {
        console.log("[LIVROS PUT FAIL] " + err);
        res.status(500).json({ message: "Erro ao atualizar livro" });
        return;
      }

      res.json({ message: "Livro atualizado" });
    });
  });
};

export default updateLivro;
