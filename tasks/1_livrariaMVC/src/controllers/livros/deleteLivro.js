import conn from "../../config/conn.js";

const deleteLivro = (req, res) => {
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
};

export default deleteLivro