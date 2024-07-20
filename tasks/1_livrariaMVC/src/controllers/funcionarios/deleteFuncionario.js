import conn from "../../config/conn.js";

const deleteFuncionario = (req, res) => {
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
};

export default deleteFuncionario;
