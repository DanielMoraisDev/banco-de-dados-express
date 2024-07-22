import conn from "../../config/conn.js";

const deleteEmprestimo = (req, res) => {
  const { id } = req.params;

  const deleteSql = /*sql*/ `
    DELETE FROM emprestimos
    WHERE ?? = ?
  `;

  const deleteSqlData = ["emprestimo_id", id]

  conn.query(deleteSql, deleteSqlData, (err) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar emprestimo" });
      return;
    }

    res.json({ message: "Emprestimo foi deletado" });
  });
};

export default deleteEmprestimo;
