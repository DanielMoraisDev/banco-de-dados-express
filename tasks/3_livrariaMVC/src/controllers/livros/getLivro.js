import conn from "../../config/conn.js";

const getLivro = (req, res) => {
  const { id } = req.params;
  
  const sql = /*sql*/ `
  SELECT * FROM livros 
  WHERE ?? = ?
  `;

const sqlData = ["livro_id", id]

  conn.query(sql, sqlData, (err, data) => {
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
};

export default getLivro;
