import conn from "../../config/conn.js";

const deleteCliente = (req, res) => {
  const { id } = req.params;

  const deleteSql = /*sql*/ `
    DELETE FROM clientes
    WHERE ?? = ?
  `;

  const deleteSqlData = ["cliente_id", id]

  conn.query(deleteSql, deleteSqlData, (err) => {
    if (err) {
      res.status(500).json({ message: "Erro ao deletar cliente" });
      return;
    }

    res.json({ message: "Cliente foi deletado" });
  });
};

export default deleteCliente;
